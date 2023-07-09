import { router as userRouter } from "./index.js";
import { transporter } from "../utils/mailer.js";
import { authUser,registerUser,logoutUser,getUserProfile,updateUserProfile } from "../controllers/userController.js"
import { protect } from '../middleware/authMiddleware.js'

userRouter.post('/register', registerUser)
userRouter.post('/auth', authUser)
userRouter.post('/logout',logoutUser)
userRouter.route('/profile').get(protect,getUserProfile).put(protect,updateUserProfile)

let savedOTPS = {
};
userRouter.post('/sendotp',(req,res)=>{
    let email = req.body.email;
    // let email="gavishkak@gmail.com"
    let digits = '0123456789';
    let limit = 4;
    let otp = ''
    for (let i = 0; i < limit; i++) {
        otp += digits[Math.floor(Math.random() * 10)];

    }
    
    var options = {
        from: 'builtrackrverifyn@gmail.com',
        to: `${email}`,
        subject: "Testing node emails",
        html: `<p>Enter the otp: ${otp} to verify your email address</p>`

    };
    transporter.sendMail(
        options, function (error, info) {
            if (error) {
                console.log(error);
                res.status(500).send("couldn't send")
            }
            else {
                savedOTPS[email] = otp;
                setTimeout(
                    () => {
                        delete savedOTPS.email
                    }, 60000
                )
                res.status(200).send("sent otp")
            }

        }
    )

})

userRouter.post('/verifyotp',(req,res)=>{
    let otprecived = req.body.otp;
    let email = req.body.email;
    if (savedOTPS[email] == otprecived) {
        res.send("Verfied");
    }
    else {
        res.status(500).send("Invalid OTP")
    }

})
export {userRouter}