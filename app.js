var express           = require('express');
var mongoose          = require('mongoose');
const shortid         = require('shortid');
var Item              = require('./models/item');
var User              = require('./models/user');
var nodemailer        = require('nodemailer');
const University      = require('./models/university');
const Degree          = require('./models/degree');
const Country         = require('./models/country');
const Programme       = require('./models/programme');
const Years           = require('./models/years');
const User_device     = require('./models/user_device');
const User_course     = require('./models/user_course');
const Profile         = require('./models/profile');
const Interest        = require('./models/interest');
const Achievement     = require('./models/achievement');
const Language        = require('./models/language');
const Skills          = require('./models/skills');
const Education       = require('./models/education');
const Experience      = require('./models/experience');
//const Highlights      = require('./models/highlights');
const University_schools = require('./models/university_schools');
const  Otp            = require('./models/otp');
const Domain          = require('./models/domain');

const Admin_users     = require('./models/admin_users');
const Delete_users    = require('./models/delete_users');

const Offers          = require('./models/offers');
const Blogs           = require('./models/blogs');
const Brands          = require('./models/brands');
const Posts           = require('./models/posts');
const Groups          = require('./models/groups');
const Coupon          = require('./models/coupons');
const Friend_lists    = require('./models/friend_lists');

// 25-07-2021 modal 

const About                   = require('./models/about_us');
const Post_attachment         = require('./models/post_attachments');
const Event_link_user_list    = require('./models/event_link_user_list');
const Categories              = require('./models/categories');


// access_right, admin_groups, admin_users, admin_users_groups, archieve_chat
// back_up, block_user, blogs, blog_banner, blog_categories, blog_likes,
// brands_online_instore, brands_redeem_user, brand_banner,categories_icon_profiles,
// chat, chat_rooms, chat_seen_unseen, chat_wallpaper, comments, comment_replies,
// contact_us, course_covered, delete_user_group_chat, discount_coupons, domains,
// faqs, feedback, friend_requests, group_users, hide_user, hobbies_interests, json_request,
// management_section, notifications, our_teams, posts_options, post_comment_likes,
// post_options_select_by_user, post_tag_groups, post_tag_users, profile_questions,
// profile_user_answers, reply_contact_us, report_user_post, social_media_post,
// term&conditions, user_blog_saved, user_categories_profiles, user_hobbies_interests,
// user_offer_saved, user_read_blog, user_shared_blog, 	user_shared_offer, user_view_offer, version

var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "akshaychauhanofficial93@gmail.com",
    pass: "Qazwsxedc123456",
  },
});





const port = process.env.port || 5000
var app = express();

mongoose.Promise = global.Promise;
var promise = mongoose.connect('mongodb+srv://dubai_students_93:dubai_students_93@unilife.jxohc.mongodb.net/new_dubai_students_93?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
promise.then(function(db) {
  
    console.log("Connected to database!!!");
}, function(err){
    console.log("Error in connecting database " + err);
});



app.listen(port, function () {
  // app.get('port')
  console.log('Listening on port ' + port);
});
app.use(express.json());



//*********************   unilife new Api Starts here ***********************//


//*********** University list *************************//

app.get('/university-list',(req,res)=>{

	University.find()
    .then((data) => {
      let userdata = data;
      if(userdata.length > 0) {

        res.send({
          status: true,
          message: "university list",
          data: userdata,
        });
      } else {
        res.send({
          status: false,
          message: "data not found",
          data: [],
        });
      }
  
    })
    .catch((e) => {
      res.send(e);
    });
  
  
});
app.get('/degree-list',(req,res)=>{

	Degree.find()
    .then((data) => {
      let userdata = data;
      if(userdata.length > 0) {

        res.send({
          status: true,
          message: "university list",
          data: userdata,
        });
      } else {
        res.send({
          status: false,
          message: "data not found",
          data: [],
        });
      }
  
    })
    .catch((e) => {
      res.send(e);
    });
  
  
});
app.get('/year-list',(req,res)=>{

	Years.find()
    .then((data) => {
      let userdata = data;
      if(userdata.length > 0) {

        res.send({
          status: true,
          message: "Years list",
          data: userdata,
        });
      } else {
        res.send({
          status: false,
          message: "data not found",
          data: [],
        });
      }
  
    })
    .catch((e) => {
      res.send(e);
    });
  
  
});
app.get('/programme-list',(req,res)=>{

	Programme.find()
    .then((data) => {
      let userdata = data;
      if(userdata.length > 0) {

        res.send({
          status: true,
          message: "Programme list",
          data: userdata,
        });
      } else {
        res.send({
          status: false,
          message: "data not found",
          data: [],
        });
      }
  
    })
    .catch((e) => {
      res.send(e);
    });
  
  
});
app.get('/country-list',(req,res)=>{

	Country.find()
    .then((data) => {
      let userdata = data;
      if(userdata.length > 0) {

        res.send({
          status: true,
          message: "Country list",
          data: userdata,
        });
      } else {
        res.send({
          status: false,
          message: "data not found",
          data: [],
        });
      }
  
    })
    .catch((e) => {
      res.send(e);
    });
  
  
});

app.post('/signup-user',(req,res)=>{
 
  let user_type                = req.body.user_type;
  let university_school_id     = req.body.university_school_id;
  let degree                  = req.body.degree;
  let programme_name          = req.body.programme_name;
  let current_year            = req.body.current_year;
  let university_school_email = req.body.university_school_email;
  let refered_by              = req.body.refered_by;
  let name                    = req.body.name;
  let phone                   = req.body.phone;
  let email                   = req.body.email;
  let parent_email            = req.body.parent_email;
  let interest                = req.body.interest;
  let ielts                   = req.body.interest;
  
  //const otp = new User(req.body);
  
  //************  time stamp  **************************/
  let today = new Date();
  let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
  let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  let dateTime = date+' '+time;

  //************  time stamp  **************************/
  
  
  //***** refer code generate ******/

  var randStr = "";
    for(var letter=1;letter<=5;letter++) {
        randStr+= letter%2==0 ? String.fromCharCode(Math.random()*(91-65)+65) : Math.ceil(Math.random()*6);
    }
    //var randStr = "UNI"+ randStr;
   
    let referral_Code = randStr.toUpperCase();

    let usermail = "";
    if(user_type == "University student") {
      usermail = university_school_email;
    }
    else {
      usermail = email;
    
    }
    
    //********* send otp to email  ******************************/
      let otpnum = (Math.floor(Math.random() * 10000) + 10000).toString().substring(1);
      let otpData = {
                'otp' : otpnum,
                'email' : usermail,
                'created_date' :  dateTime
              };
      let userData = {'user_type'       : user_type,
                      'university_school_id' : university_school_id,
                      'degree'          : degree,
                      'programme_name'  : programme_name,
                      'current_year'    : current_year,
                      'university_school_email' : university_school_email,
                      'name'            : name,
                      'phone'           : phone,
                      'email'           : usermail,
                      'password'        : "12345",
                      'ielts'           : ielts,
                      'parent_email'    : parent_email,
                      'refered_by'      : refered_by,
                      'referral_Code'   : referral_Code,
                      'interest'        : interest,
                      'created_at'      : dateTime,
                      'updated_at'      : dateTime
       };
       
      
       const otp = new Otp(otpData);
       const user = new User(userData);
       otp.save().then(()=>{
        
           var mailOptions = {
              from: "akshaychauhanofficial93@gmail.com",
              to : usermail,
              subject: "Email Verification",
              text: "Your Email verification Otp is: " + otpnum
              
            };
            transporter.sendMail(mailOptions, function (error, info) {
              if (error) {
                console.log(error);
              } else {
                console.log("Email sent: " + info.response);
              }
            });

            
            user.save().then(() => {
              res.send({ status : true, message: 'Otp has been sent to email', data: otpData});

            }).catch((e)=>{
             
              res.send(e);
             })

           

        }).catch((e)=>{
         // res.send({ status : false, message: 'user has faied to signup ', data: []});
         res.send(e);
        })

        



    //***************************** send otp to email ends ******************************/

  
});









// app.post('/signup-user',(req,res)=>{
// 	    const otp = new User(req.body);
//       const pre = "UNI";
//       var randStr = "";
//         for(var letter=1;letter<=5;letter++) {
//             randStr+= letter%2==0 ? String.fromCharCode(Math.random()*(91-65)+65) : Math.ceil(Math.random()*6);
//         }
//         var randStr = pre+randStr;
//        console.log(randStr.toUpperCase());
//      otp.save(function(err, user) {
//         if (err == null) return res.send({
//           status: true,
//           message: "Otp sent to mobile!",
//           data: user,
//         });
//         res.send({
//           status: false,
//           message: "Something went wrong!",
//           data: err,
//         });
//     });
// });


app.post('/login',(req,res)=>{
  User.find({ email: req.body.username, password : req.body.password},function(err, user) {
   
    if (err == null) return res.send({
      response: true,
      message: "login successfuly",
      data: user,
    });
    res.send({
      status: false,
      message: "Something went wrong!",
      data: err,
    });
  });
  
});

app.post('/user-device',(req,res)=>{
  
  let user_id       =  req.body.user_id;
  let device_token  =  req.body.device_token;
  let device_id     =  req.body.device_id;
  let type          =  req.body.type;

  let today = new Date();
  let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
  let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  let dateTime = date+' '+time;

  let devicedata = {'user_id'        : user_id,
                      'device_token'  : device_token,
                      'device_id'     : device_id,
                      'type'          : type,
                      'created_at'    : dateTime,
                      'updated_at'    : dateTime
                     };
  
  const device = new User_device(devicedata);

  device.save(function(err, device) {
      if (err == null) return res.send({
        response :true
        
      });
      res.send({
        response :false
      });
  });
    
});



app.post('/useremailverify', (req, res) =>  {
  let usermail = req.body.email;
  User.find({ university_school_email: usermail })
    .then((data) => {
      //console.log(data);
      if(data.length == 0) {
        res.send({
          status: true, 
          message: "Email is available."
          
        });
      
      } else {
        res.send({
          status: false,
          message: "Email is already exist.please try another one.",
          
        });
      }
    })
    .catch((e) => {
      res.send(e);
    });


});

app.post('/emailverification',(req,res)=>{

  let usermail = req.body.email;
  let otpnum = (Math.floor(Math.random() * 10000) + 10000).toString().substring(1);
  let otpData = {
                'otp' : otpnum,
                'email' : usermail,
                'created_date' :  Date.now()
              };
    console.log(otpData);
      const otp = new Otp(otpData);
      
      var mailOptions = {
        from: "akshaychauhanofficial93@gmail.com",
        to : usermail,
        subject: "Email Verification",
        text: "Your Email verification Otp is: " + otpnum
        
      };
    
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });

      otp.save().then(()=>{
        res.send({ status : true, message: 'Otp has been sent to email', data: otpData});
       
      }).catch((e)=>{
        res.send({ status : false, message: 'Otp has failed to send', data: []});
      })

});


//**** Email Api End *******//


//**** Otp Verification *******//
app.post("/otp_verify", (req, res) => {
  let useremail = req.body.email;
  let verifyotp = req.body.otp;
  
  Otp.find({ email: useremail, otp : verifyotp })
    .then((data) => {
      //console.log(data);
      if(data[0].otp == verifyotp) {
        var myquery = { otp : verifyotp };
        var newvalues = { $set: {verify: "yes"} };
        Otp.updateOne(myquery, newvalues, function(err, res) {});
        
        User.find({ email: useremail })
        .then((userdata) => { 
          let userdetails = userdata;
          //console.log(userdetails[0]);

          res.send({
            status: true,
            message: "OTP has verified successfully",
            data: {data : userdetails[0]}
          });

        })
      
      } else {
        res.send({
          status: false,
          message: "Incorrect OTP",
          data: {},
        });
      }
    })
    .catch((e) => {
      
      res.send(e);
    });
});


//**** Domain Verification *******//
app.post("/get_uni_id_using_domain", (req, res) => {
  let domain = req.body.domain;
  
  
  Domain.find({ domain: domain, status : "active"})
    .then((data) => {
      let domaindata = data;
      
      if(domaindata.length > 0) {

        res.send({
          status: true,
          message: "domain is verified",
          data: domaindata,
        });
      } else {
        res.send({
          status: false,
          message: "domain is not verified",
          data: [],
        });
      }
    })
    .catch((e) => {
      res.send(e);
    });
});


//**** Domain verification ends *******//


//******* get profile url **************/
app.post("/get-url", (req, res) => {
  let user_id = req.body.user_id;
  let useremail = req.body.email;
  
  User.find({ _id: user_id})
    .then((data) => {

      let domaindata = data;
      
        var mailOptions = {
          from: "akshaychauhanofficial93@gmail.com",
          to : useremail,
          subject: "Referer Code",
          text: "Your referer Code is: " + "@gmail"+ domaindata[0].referral_Code
          
        };
        
        transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            console.log(error);
          } else {
            console.log("Email sent: " + info.response);
          }
        });
        if(domaindata.length > 0) {

          res.send({
            status: true,
            message: "Referer code Sent to Email."
            
          });
        } else {
          res.send({
            status: false,
            message: "Referer code fail to send over Email."
            
          });
        }
    })
    .catch((e) => {
      res.send(e);
    });
});



//******* get profile url **************/


//******  get_all_profile_data ************/


app.post("/get_all_profile_data", (req , res ) => {
  
  let user_id = req.body.user_id;

  User.find({ _id: user_id})
    .then((data) => {
      let userdata = data; // for user data 
        University.find({_id : userdata.university_school_id} ).then((unidata) => {
          console.log(unidata);
        })
        .catch((e) => {
          res.send(e);
        });
    })
    .catch((e) => {
      res.send(e);
    });


});


app.post("/homepage_data", async function (req, res)  {

  let user_id = req.body.user_id;
  let ws = "homepage_data";
  let data = [];
 // validate token 
  // check version 
  let udata = [];
  let same_domain = [];
  if(user_id != '') {
    // friend list//
    await Friend_lists.find({user_id : user_id}).then((ufriend) => {
      udata = ufriend;
    
    });

    User.find({_id : user_id}).then((udata) => {
      let up_id = udata[0].university_school_id;
      let f_list = user_id;
      User.find({university_school_id : up_id}, {"_id": 1}).then((domaindata) => {
        same_domain = domaindata;
        
        // let arr = '';
        // arr = same_domain.join (",");
        // console.log(arr);
      });
      // get posts data 
      // $data = $this->custom_model->get_data_array("SELECT id,admin_id,user_id,university_post_id,caption,location_name,post_through_group,group_id,status,type,question,event_title,event_link,event_description,created_at FROM posts WHERE  `user_id` IN ($f_list) AND `type` != '' OR (`admin_id` = '1' AND `university_post_id` = '$up_id' AND `type` != '' )  ORDER BY `id` DESC LIMIT $pagination,$limit ");
      // WHERE  `user_id` IN ($f_list) AND 
      //`type` != '' OR (`admin_id` = '1' AND
      // `university_post_id` = '$up_id' AND 
      //`type` != '' )
      Posts.find({$and: [  ["type !=", '' ], [ {"university_post_id": up_id} ] ]}, {"_id":1, "admin_id":1,"user_id": 1,"university_post_id":1,"caption":1,"location_name":1,"post_through_group":1,"group_id":1,"status":1,"type":1,"question":1,"event_title":1,"event_link":1,"event_description":1,"created_at":1  }).then((pdata) => {

        console.log(pdata);

      });

    })
    .catch((e) => {
      res.send({
        status: false,
        ws    : ws,
        message: "error "+e

      });
    });

  }
  else {
    res.send({
      status: false,
      ws    : ws,
      message: "Invalid request"
      
    });
  }
});


/******************************************* Admin panel api starts here *************************/


app.post("/adminlogin", (req, res) => {
  let adminid = req.body.username;
  let password = req.body.password;
  Admin_users.find({ email: adminid ,password : password }).then((data) => {
    let userdata = data;
    if(userdata.length > 0) {
      res.send({
          status: true,
          message: "Login successfully",
          data: userdata,
        });
    } 
    else {
        res.send({
          status: false,
          message: "login failed",
          data: [],
        });
    }
       
  })
    .catch((e) => {
      res.send(e);
  });

});

app.get("/userlist", (req, res) => {
  User.find({})
    .then((data) => {
      let userdata = data; // for user data 
      if(userdata.length > 0) {

        res.send({
          status: true,
          message: "userlist",
          data: userdata,
        });
      } else {
        res.send({
          status: false,
          message: "data not found",
          data: [],
        });
      }
 
    })
    .catch((e) => {
      res.send(e);
    });

});


app.post("/tokenupdate", (req, res) => {
  let user_id = req.body.id;
  let token = req.body.token;

    var myquery = { _id : user_id };
    var newvalues = { $set: {token: token} };
    Admin_users.updateOne(myquery, newvalues, function(err, res) {
      
  });

});

// app.get("/dash", async function(req, res){
//     var uuu = 0;
//   await User.countDocuments().then((countusers) => {
//     if(countusers) {
//       uuu = countusers;
//     }
//   });
//   console.log(uuu);
// });

app.get("/dashboardlist",  async function (req, res)  {
  var dashData = [];
  var rusers = 0;
  var rdelete_users = 0;
  var roffers = 0;
  var rblogs = 0;
  var rbrands = 0;
  var rposts = 0;
  var rgroups = 0;
  var runiversity_schools = 0;

  await Coupon.find().sort({_id:-1}).limit(5)
    .then((coupondata) => {
      dashData = coupondata;
     
  });

  await User.countDocuments().then((countusers) => {
    
    rusers = countusers;
   
  })

  await Delete_users.countDocuments().then((delusers) => {
    rdelete_users = delusers;
  })

  await Offers.countDocuments().then((offers) => {
    roffers = offers;
  })

  await Blogs.countDocuments().then((blogs) => {
    rblogs = blogs;
  })

  await Brands.countDocuments().then((brands) => {
    rbrands = brands;
  })

  await Posts.countDocuments().then((posts) => {
    rposts = posts;
  })

  await Groups.countDocuments().then((groups) => {
    rgroups = groups;
  })

  await University_schools.countDocuments().then((university_schools) => {
    runiversity_schools = university_schools;
  })

  res.send({ 
        status: true,
        message: "dashboard list",
        data: {'coupon'           : dashData,
              'users'             : rusers,
              'delete_users'      : rdelete_users,
              'offers'            :  roffers,
              'blogs'             : rblogs,
              'brands'            : rbrands,
              'posts'             : rposts,
              'groups'            : rgroups,
              'university_schools': runiversity_schools
            }
      });
   

});


app.get("/schooluniversitylist", (req, res) => {
  University_schools.find()
    .then((data) => {
      let userdata = data;
      if(userdata.length > 0) {

        res.send({
          status: true,
          message: "School university list",
          data: userdata,
        });
      } else {
        res.send({
          status: false,
          message: "data not found",
          data: [],
        });
      }
  
    })
    .catch((e) => {
      res.send(e);
    });

});


app.post("/adduser", (req, res) => {

  let username              = req.body.username;
  let university_school_id  = req.body.university_school_id;
  let university_school     = req.body.university_school;
  let status                = req.body.status;
  let password              = req.body.password;
  let university_school_email = req.body.university_school_email;


  let userdata = {'university_school_id' : university_school_id,
                  'username'             : username,
                  'university_school_email': university_school+university_school_email,
                  'user_type'               : 0,
                  'status'                : status,
                  'password'              : password,
                  'decoded_password'      : password

                  }
    
    const user = new User(userdata);
      user.save().then(() => {
        res.send({
          status: true,
          message: "User inserted successfully"
          
        });

      }).catch((e)=>{
        res.send({
            status: false,
            message: "Something went wrong!"+e
            
          });
      })

  // check username 
  // User.find()
  //   .then((data) => {
  //     let userdata = data;
  //     if(userdata.length == 0) {



        
  //     } else {
  //       res.send({
  //         status: false,
  //         message: "username is exist",
  //         data: [],
  //       });
  //     }
  
  //   })
  //   .catch((e) => {
  //     res.send(e);
  //   });
  
  

});

app.post("/getuserdetail", (req, res) => {

  let user_id = req.body.user_id;

  User.find({ _id: user_id })
    .then((data) => {
      let userdata = data;
      if(userdata.length > 0) {

        res.send({
          status: true,
          message: "User details",
          data: userdata,
        });
      } else {
        res.send({
          status: false,
          message: "data not found",
          data: [],
        });
      }
  
    })
    .catch((e) => {
      res.send(e);
    });

});




app.post("/updateuser", (req, res) => {

  let user_id              = req.body.user_id;
  let username              = req.body.username;
  let university_school_id  = req.body.university_school_id;
  let university_school     = req.body.university_school;
  let status                = req.body.status;
  let password              = req.body.password;
  let university_school_email = req.body.university_school_email;


  let userdata = {'university_school_id' : university_school_id,
                  'username'             : username,
                  'university_school_email': university_school+university_school_email,
                  'user_type'               : 0,
                  'status'                : status,
                  'password'              : password,
                  'decoded_password'      : password

                  }
     
    var myquery = { _id : user_id };
    var newvalues = { $set: userdata };

    User.updateOne(myquery, newvalues).then(() =>  {
      res.send({
        status: true,
        message: "User updated successfully"
        
      });           
    }).catch((e)=>{
      res.send({
          status: false,
          message: "Something went wrong!"+e
          
          
        });
    })
    

});

app.post("/deleteuser", (req, res) => {



});

app.get("/deleteuserlist", (req, res) => {
  Delete_users.find()
    .then((data) => {
      let userdata = data;
      if(userdata.length > 0) {

        res.send({
          status: true,
          message: "Deleted users list",
          data: userdata,
        });
      } else {
        res.send({
          status: false,
          message: "data not found",
          data: [],
        });
      }
  
    })
    .catch((e) => {
      res.send(e);
    });

});


app.post("/show_friends", (req, res) => {
  let user_id = req.body.user_id;

  // find all user friend id list 

  // get each user id //
  


});








