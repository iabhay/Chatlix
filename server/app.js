const express = require('express');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');



// Connection
require('./chatlix-db/connection');

//Importing
const Users = require('./models/Users');
const Conversations = require('./models/Conversations');
const Messages = require('./models/Messages');

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors());

const port = process.env.PORT || 8000;

app.get('/', (req, res) =>{
    res.send('Welcome');
});

app.post('/api/register', async (req, res, next)=>{
    try{
        const { name, mobile, email, password } = req.body;
        if(!name || !mobile || !email || !password){
            res.status(400).send('Please send all required Details');
        }
        else{
            const isMobilePresent = await Users.findOne({mobile});
            const isEmailPresent = await Users.findOne({email});
            if(isMobilePresent || isEmailPresent){
                res.status(400).send('User already exists!');
            }       
            else{
                const newUser = new Users({name, mobile, email});
                bcryptjs.hash(password, 10, (err, hashedPass)=>{
                    newUser.set('password', hashedPass);
                    newUser.save();
                    next();
                });
                return res.status(200).send('User Registration Successful')

            }
        }
    } catch (err){
        console.log(err, 'error')
    }
})

app.post('/api/login', async (req, res, next)=>{
    try{
        const {mobile, email, password} = req.body;
        if(!mobile || !email || !password){
            res.status(400).send("Please fill all required details!");
        }
        else{
            const user = await Users.findOne({mobile, email});
            if(!user){
                res.status(400).send("Mobile or Email is incorrect!");
            }
            else{
                const validateUser = await bcryptjs.compare(password, user.password);
                if(!validateUser){
                    res.status(400).send("Wrong Password!!");
                }
                else{
                    const payload={
                        userId: user.id,
                        mobile: user.mobile,
                        email:user.email
                    }
                    const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || "THIS_IS_A_JWT_KEY";

                    jwt.sign(payload, JWT_SECRET_KEY, {expiresIn: 84600}, async (error, token) => {
                        await Users.updateOne({_id : user._id} ,{
                            $set: {token}
                        })
                        user.save();
                        res.status(200).json({user :{id: user._id, email:user.email, name:user.name, mobile:user.mobile}, token: token});
                                        })
                }
            }
        }
    } catch(error){
        console.log(error, 'Error');
    }
})



app.post('/api/conversation', async (req, res) =>{
    try{
        const {senderId, receiverId} = req.body;
        const newConversation = new Conversations({members : [senderId, receiverId]});
        await newConversation.save();
        res.status(200).send("Conversation created Successfully");
    } catch (error){
        Console.log(error, 'ERROR');
    }
})

app.get('/api/conversations/:userId', async (req, res) =>{
    try{
        const userId = req.params.userId;
        const conversations = await Conversations.find({members: {$in : [userId]}});
        const conversationUserData = Promise.all(conversations.map(async (conversation)=>{
            const receiverId = conversation.members.find((member)=> member !== userId);
            // const user = receiverId ? await Users.findById(receiverId) : null;
            const user = await Users.findById(receiverId);
            return {user : {email:user.email, mobile:user.mobile, name:user.name}, conversationId: conversation._id}

        }))
        res.status(200).json(await conversationUserData);
    } catch (error){
        Console.log(error, 'ERROR');
    }
})

app.post('/api/message', async (req, res)=> {
    try{
        const {conversationId, senderId, message, receiverId = ''} = req.body;
        if(!senderId || !message) return res.status(400).send("Please fill all required fields");
        if(!conversationId && receiverId){
            const newConversation = new Conversations({members : [senderId, receiverId]});
        await newConversation.save();
        const newMessage = new Messages({conversationId : newConversation._id, senderId, message});
        await newMessage.save();
        return res.status(200).send('Message sent Successfully');
        }
        else if(!conversationId && !receiverId){
            return res.status(400).send('Please fill all details');
        } 
        const newMessage = new Messages({conversationId, senderId, message});
        await newMessage.save();
        res.status(200).send("Message sent successfully");
    } catch(err){
        console.log(err, 'error'); 
    }
})

app.get('/api/message/:conversationId', async (req, res)=> {
    try{

        const conversationId = req.params.conversationId;
        if(conversationId === 'new') return res.status(200).json([]);
        const messages = await Messages.find({conversationId});
        const messageUserData = Promise.all(messages.map(async (message) => {
        const user = await Users.findById(message.senderId);
        return {user : {email:user.email, mobile: user.mobile, name: user.name}, message: message.message}

    }));
    res.status(200).json(await messageUserData);
} catch(err) {
    console.log('err', err);
}

})

app.get('/api/users', async (req, res)=>{
    try{
        const users = await Users.find();
        const usersData = Promise.all(users.map(async (user)=>{
            return {user: {email:user.email, mobile:user.mobile, name: user.name}, userId: user._id}
        }))
        res.status(200).json(await usersData);
    } catch(err){
        console.log(err, 'error');

    }
})


app.listen(port, ()=>{
    console.log('Listening on port ' + port);
})