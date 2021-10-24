var express = require('express');
var mongoose = require('mongoose');
const shortid = require('shortid');
var Item = require('./models/item');
var User = require('./models/user');
var nodemailer = require('nodemailer');
const University = require('./models/university');
const Degree = require('./models/degree');
const Country = require('./models/country');
const Programme = require('./models/programme');
const Years = require('./models/years');
const User_device = require('./models/user_device');
const User_course = require('./models/user_course');
const Profile = require('./models/profile');
const Interest = require('./models/interest');
const Achievement = require('./models/achievement');
const Language = require('./models/language');
const Skills = require('./models/skills');
const Education = require('./models/education');
const Experience = require('./models/experience');
const Highlight = require('./models/highlights');
const University_schools = require('./models/university_schools');
const Otp = require('./models/otp');
const Domain = require('./models/domain');

const Admin_users = require('./models/admin_users');
const Delete_users = require('./models/delete_users');

const Offers = require('./models/offers');
const Blogs = require('./models/blogs');
const Brands = require('./models/brands');
const Posts = require('./models/posts');
const Groups = require('./models/groups');
const Coupon = require('./models/coupons');
const Friend_lists = require('./models/friend_lists');

// 25-07-2021 modal 

const About = require('./models/about_us');
const Post_attachment = require('./models/post_attachments');
const Event_link_user_list = require('./models/event_link_user_list');
const Categories = require('./models/categories');
const Blog_banner = require('./models/blog_banner');
const Blog_categories = require('./models/blog_categories');
const Blog_likes = require('./models/blog_likes');

// 26-07-21 modal 

const Brand_banner = require('./models/brand_banner');
const Contact_us = require('./models/comments');
const Discount_coupons = require('./models/discount_coupons');
const Faqs = require('./models/faqs');
const Feedback = require('./models/feedback');
const Terms = require('./models/term&conditions');
const Redeem_user = require('./models/brands_redeem_user');
const User_social_profile = require('./models/user_social_profile');
const Posts_options  = require('./models/posts_options');

const Report_user_post = require('./models/report_user_post');
const Version = require('./models/version');
const Comments = require('./models/comments');
const Comment_replies = require('./models/comment_replies');
const Post_comment_likes = require('./models/post_comment_likes');

const Post_options_select_by_user = require('./models/post_options_select_by_user');





// const university              = require('./models/university');



// access_right, admin_groups, admin_users, admin_users_groups, archieve_chat
// back_up, block_user,
// brands_online_instore,categories_icon_profiles,
// chat, chat_rooms, chat_seen_unseen, chat_wallpaper, comments, comment_replies,
// course_covered, delete_user_group_chat, domains,
// friend_requests, group_users, hide_user, hobbies_interests, json_request,
// management_section, notifications, our_teams, post_comment_likes,
// post_options_select_by_user, post_tag_groups, post_tag_users, profile_questions,
// profile_user_answers, reply_contact_us, social_media_post,
// term&conditions, user_blog_saved, user_categories_profiles, user_hobbies_interests,
// user_offer_saved, user_read_blog, user_shared_blog, 	user_shared_offer, user_view_offer, version



const port = process.env.port || 5000
var app = express();

//************/ email setting ***********//
var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "akshaychauhanofficial93@gmail.com",
    pass: "Qazwsxedc123456",
  },
});

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

//********** files upload **************/
var path = require('path');
const fs = require('fs');
const url = require('url');



var dir = path.join(__dirname, 'uploads');

//app.use("/uploads", express.static(path.join(__dirname, 'uploads')));


const multer = require('multer');
const blog_banner = require('./models/blog_banner');
const user = require('./models/user');
const { response } = require('express');
// const comments = require('./models/comments');
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads');
  },
  filename: function (req, file, cb) {
    cb(null, Math.floor(Date.now() / 1000) + file.originalname);
  }
});
var upload = multer({
  storage: storage
});

//********** files upload ends **************/




mongoose.Promise = global.Promise;
var promise = mongoose.connect('mongodb+srv://dubai_students_93:dubai_students_93@unilife.jxohc.mongodb.net/new_dubai_students_93?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
promise.then(function (db) {

  console.log("Connected to database!!!");
}, function (err) {
  console.log("Error in connecting database " + err);
});



app.listen(port, function () {
  // app.get('port')
  console.log('Listening on port ' + port);
});
app.use(express.json());

//****** CROS browser *********/

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

//****** CROS browser ends here *********/

//*********************   Unilife new Api Starts here ***********************//


//*********** University list *************************//

app.get('/university-list', (req, res) => {

  University.find()
    .then((data) => {
      let userdata = data;
      if (userdata.length > 0) {
        res.send({
          status: true,
          message: "university list",
          data: userdata
        });
      }
      else {
        res.send({
          status: false,
          message: "data not found",
          data: []
        });
      }
    })
    .catch((e) => {
      res.send({
        status: false,
        message: "error"+e,
        data: []
      });
    });

});

app.post("/add-university-school", (req, res) => {
  let name = req.body.university;
  let deanname = req.body.deanname;
  let noofstudent = req.body.noofstudent;
  let domain = req.body.domain;
  let status = req.body.status;
  let lastId = ""; 

  //************  time stamp  **************************/
  let today = new Date();
  let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
  let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  let dateTime = date + ' ' + time;

  //************  time stamp  **************************/

  let universityschoolData = {
    "name": name,
    "dean_name": deanname,
    "no_of_students": noofstudent,
    "status": status,
    "created_at": dateTime,
    "updated_at": dateTime
  };
  const university_schools = new University_schools(universityschoolData);
  university_schools.save().then((universityData) => {
    lastId = universityData[0]._id;
  });
  //let lastId = 'de344b7544gvhh6hsadg';

  University_schools.find({ name: name }, function (err, data) {
    let schooldata = data;

    lastId = schooldata.find(_id => lastId._id);

    let universityData = {
      "university_id": lastId,
      "university_name": name,
      "domain": domain
    };
    const school = new University(universityData);
    school.save().then(() => {
      res.send({
        status: true,
        message: "University save successfully"

      });

    })
      .catch((e) => {
        res.send({
          status: false,
          message: "something went wrong " + e

        });
      });

  })
    .catch((e) => {
      res.send(e);
    });

});


app.post("/delete-university-school", (req, res) => {
  let university_id = req.body.university_id;
  University_schools.remove({ _id: university_id })
    .then(() => {
      res.send({
        status: true,
        message: "University school has been deleted"

      });

    })
    .catch((e) => {
      res.send({
        status: false,
        message: "University school has failed to delete"

      });
    });

});



app.get('/degree-list', (req, res) => {

  Degree.find()
    .then((data) => {
      let userdata = data;
      if (userdata.length > 0) {

        res.send({
          status: true,
          message: "university list",
          data: userdata
        });
      } else {
        res.send({
          status: false,
          message: "data not found",
          data: []
        });
      }

    })
    .catch((e) => {
      res.send({
        status: false,
        message: "error"+e,
        data: []
      });
    });


});
app.get('/year-list', (req, res) => {

  Years.find()
    .then((data) => {
      let userdata = data;
      if (userdata.length > 0) {

        res.send({
          status: true,
          message: "Years list",
          data: userdata
        });
      } else {
        res.send({
          status: false,
          message: "data not found",
          data: []
        });
      }

    })
    .catch((e) => {
      res.send({
        status: false,
        message: "error"+e,
        data: []
      });
    });


});
app.get('/programme-list', (req, res) => {

  Programme.find()
    .then((data) => {
      let userdata = data;
      if (userdata.length > 0) {

        res.send({
          status: true,
          message: "Programme list",
          data: userdata
        });
      } else {
        res.send({
          status: false,
          message: "data not found",
          data: []
        });
      }

    })
    .catch((e) => {
      res.send({
        status: false,
        message: "error"+e,
        data: []
      });
    });


});
app.get('/country-list', (req, res) => {

  Country.find()
    .then((data) => {
      let userdata = data;
      if (userdata.length > 0) {

        res.send({
          status: true,
          message: "Country list",
          data: userdata
        });
      } else {
        res.send({
          status: false,
          message: "data not found",
          data: []
        });
      }

    })
    .catch((e) => {
      res.send({
        status: false,
        message: "error"+e,
        data: []
      });
    });


});

app.post('/signup-user', (req, res) => {

  let user_type = req.body.user_type;
  let university_school_id = req.body.university_school_id;
  let degree = req.body.degree;
  let programme_name = req.body.programme_name;
  let current_year = req.body.current_year;
  let university_school_email = req.body.university_school_email;
  let refered_by = req.body.refered_by;
  let name = req.body.name;
  let phone = req.body.phone;
  let email = req.body.email;
  let parent_email = req.body.parent_email;
  let interest = req.body.interest;
  let ielts = req.body.interest;

  //const otp = new User(req.body);

  //************  time stamp  **************************/
  let today = new Date();
  let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
  let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  let dateTime = date + ' ' + time;

  //************  time stamp  **************************/


  //***** refer code generate ******/

  var randStr = "";
  for (var letter = 1; letter <= 5; letter++) {
    randStr += letter % 2 == 0 ? String.fromCharCode(Math.random() * (91 - 65) + 65) : Math.ceil(Math.random() * 6);
  }
  //var randStr = "UNI"+ randStr;

  let referral_Code = randStr.toUpperCase();

  let usermail = "";
  if (user_type == "University student") {
    usermail = university_school_email;
  }
  else {
    usermail = email;

  }

  //********* send otp to email  ******************************/
  let otpnum = (Math.floor(Math.random() * 10000) + 10000).toString().substring(1);
  let otpData = {
    'otp': otpnum,
    'email': usermail,
    'created_date': dateTime
  };
  let userData = {
    'user_type': user_type,
    'university_school_id': university_school_id,
    'degree': degree,
    'programme_name': programme_name,
    'current_year': current_year,
    'university_school_email': university_school_email,
    'name': name,
    'phone': phone,
    'email': usermail,
    'password': "12345",
    'ielts': ielts,
    'parent_email': parent_email,
    'refered_by': refered_by,
    'referral_Code': referral_Code,
    'interest': interest,
    'created_at': dateTime,
    'updated_at': dateTime
  };


  const otp = new Otp(otpData);
  const user = new User(userData);
  otp.save().then(() => {

    var mailOptions = {
      from: "akshaychauhanofficial93@gmail.com",
      to: usermail,
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
      res.send({ status: true, message: 'Otp has been sent to email', data: otpData });

    }).catch((e) => {

      res.send({
        status: false,
        message: "error"+e,
        data: []
      });
    })

  }).catch((e) => {
    // res.send({ status : false, message: 'user has faied to signup ', data: []});
    res.send({
      status: false,
      message: "error"+e,
      data: []
    });
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


app.post('/login', (req, res) => {
  User.find({ email: req.body.username, password: req.body.password }, function (err, user) {

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

app.post('/user-device', (req, res) => {

  let user_id = req.body.user_id;
  let device_token = req.body.device_token;
  let device_id = req.body.device_id;
  let type = req.body.type;

  let today = new Date();
  let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
  let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  let dateTime = date + ' ' + time;

  let devicedata = {
    'user_id': user_id,
    'device_token': device_token,
    'device_id': device_id,
    'type': type,
    'created_at': dateTime,
    'updated_at': dateTime
  };

  const device = new User_device(devicedata);

  device.save(function (err, device) {
    if (err == null) return res.send({
      response: true

    });
    res.send({
      response: false
    });
  });

});



app.post('/useremailverify', (req, res) => {
  let usermail = req.body.email;
  User.find({ university_school_email: usermail })
    .then((data) => {
      //console.log(data);
      if (data.length == 0) {
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
      res.send({
        status: false,
        message: "error"+e
        
      });
    });


});

app.post('/emailverification', (req, res) => {

  let usermail = req.body.email;
  let otpnum = (Math.floor(Math.random() * 10000) + 10000).toString().substring(1);
  let otpData = {
    'otp': otpnum,
    'email': usermail,
    'created_date': Date.now()
  };
  console.log(otpData);
  const otp = new Otp(otpData);

  var mailOptions = {
    from: "akshaychauhanofficial93@gmail.com",
    to: usermail,
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

  otp.save().then(() => {
    res.send({ status: true, message: 'Otp has been sent to email', data: otpData });

  }).catch((e) => {
    res.send({ status: false, message: 'Otp has failed to send', data: [] });
  })

});


//**** Email Api End *******//


//**** Otp Verification *******//
app.post("/otp_verify", (req, res) => {
  let useremail = req.body.email;
  let verifyotp = req.body.otp;

  Otp.find({ email: useremail, otp: verifyotp })
    .then((data) => {
      //console.log(data);
      if (data[0].otp == verifyotp) {
        var myquery = { otp: verifyotp };
        var newvalues = { $set: { verify: "yes" } };
        Otp.updateOne(myquery, newvalues, function (err, res) { });

        User.find({ email: useremail })
          .then((userdata) => {
            let userdetails = userdata;
            //console.log(userdetails[0]);

            res.send({
              status: true,
              message: "OTP has verified successfully",
              data: { data: userdetails[0] }
            });

          })

      } else {
        res.send({
          status: false,
          message: "Incorrect OTP",
          data: {}
        });
      }
    })
    .catch((e) => {

      res.send({
        status: false,
        message: "error"+e,
        data: {}
      });
    });
});


//**** Domain Verification *******//
app.post("/get_uni_id_using_domain", (req, res) => {
  let domain = req.body.domain;


  Domain.find({ domain: domain, status: "active" })
    .then((data) => {
      let domaindata = data;

      if (domaindata.length > 0) {

        res.send({
          status: true,
          message: "domain is verified",
          data: domaindata
        });
      } else {
        res.send({
          status: false,
          message: "domain is not verified",
          data: []
        });
      }
    })
    .catch((e) => {
      res.send({
        status: false,
        message: "error"+e,
        data: []
      });
    });
});


//**** Domain verification ends *******//


//******* get profile url **************/
app.post("/get-url", (req, res) => {
  let user_id = req.body.user_id;
  let useremail = req.body.email;

  User.find({ _id: user_id })
    .then((data) => {

      let domaindata = data;

      var mailOptions = {
        from: "akshaychauhanofficial93@gmail.com",
        to: useremail,
        subject: "Referer Code",
        text: "Your referer Code is: " + "@gmail" + domaindata[0].referral_Code

      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });
      if (domaindata.length > 0) {

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
      res.send({
        status: false,
        message: "error"+e
        
      });
    });
});



//******* get profile url **************/


app.post("/unilife_get_profile", async function (req, res)  {
  let user_id = req.body.user_id;
  let language = "en";
  let ws      = req.body.ws;

  let id = "";
  let university_school_email = "";
	let	username = "";
	let	profile_image = "";
	let	user_type = "";
	let	university_school_id = "";
	let	designation = "";
	let	organisation = "";
	let	personal_mission = "";
	let	personal_description = "";
	let	profile_banner_image = "";
	let	unilife_user_name = "";
	let	university_schools_name = "";
	let	profile_logo = "";
  let userdata = [];

  if(user_id) {
      await User.find({ _id: user_id }).then((data) => {
      userdata = data;
      id = data[0]._id;
      university_school_email = data[0].university_school_email;
      username = data[0].username;
      profile_image = data[0].profile_image;
      user_type = data[0].user_type;
      university_school_id = data[0].university_school_id;
      designation = data[0].designation;
      personal_mission = data[0].personal_mission;
      personal_description = data[0].personal_description;
      profile_banner_image = data[0].profile_banner_image;
      university_school_email = data[0].university_school_email;
      unilife_user_name = data[0].username;
      university_schools_name = data[0].university_school_email;
      profile_logo = data[0].profile_image;

    })
    if(userdata.length > 0) {
      res.send({
        status: true,
        ws: ws,
        message: "User profile data",
        self_intoduction : {
                            id : id,
                            university_school_email : university_school_email,
                            username : username,
                            profile_image : profile_image,
                            user_type : user_type,
                            university_school_id : university_school_id,
                            designation : designation,
                            organisation : organisation,
                            personal_mission : personal_mission,
                            personal_description : personal_description,
                            profile_banner_image : university_school_email,
                            unilife_user_name : unilife_user_name,
                            university_schools_name : university_schools_name,
                            profile_logo : profile_logo

                           }
    
      });


    }
    else {
      res.send({
        status: false,
        ws: ws,
        message: "User data not found",
        self_intoduction : userdata
    
      });
      
    }
  }
  else {
    res.send({
      status: false,
      ws: ws,
      message: "Invalid request"
  
    });
    
  }



});


//******  get_all_profile_data ************/
app.post("/get_all_profile_data", async function (req, res) {

  let user_id = req.body.user_id;
  var obj = [];
  var response = [];
  var university_school_id = "";

  let uid = user_id;
  let unilife_user_name = "";
  let profile_banner_image = "";
  let university_schools_name = "";
  let user_type = "";
  let profile_logo = "";
  let profile_image = "";
  let university_school_email = "";
  let username = "";
  
  let designation = "";
  let organisation = "";
  let personal_mission = "";
  let personal_description = "";

  
  if(user_id) {
    
     await User.find({ _id: uid }).then((data) => {

      if(data.length > 0) {
        university_school_id = data[0].university_school_id;

        unilife_user_name = data[0].username;
        profile_banner_image = data[0].profile_banner_image;
        university_schools_name = data[0].profile_banner_image;
        user_type = data[0].user_type;
        university_school_email = data[0].university_school_email,
        username = data[0].username,
        profile_image = data[0].profile_image,
        
       
        designation = data[0].designation,
        organisation = data[0].organisation,
        personal_mission = data[0].personal_mission,
        personal_description = data[0].personal_description

      }
     


    })
    
    if(university_school_id) {
      await University_schools.find({ _id: university_school_id }).then((unidata) => {
      

      });

    }
  
    

    await Highlight.find({ user_id: user_id }).then((uhigh) => {
      response['user_highlights'] = uhigh;
    });

    await Education.find({ user_id: user_id }).then((uedu) => {
      response['user_education'] = uedu;
    })

    await Skills.find({ user_id: user_id }).then((uskills) => {
      response['user_skills'] = uskills;
    })

    await Language.find({ user_id: user_id }).then((lang) => {
      response['user_languages'] = lang;
    })

    await Achievement.find({ user_id: user_id }).then((achieve) => {
      response['user_achievements'] = achieve;
    })

    await Interest.find({ user_id: user_id }).then((userInterest) => {
      response['user_interest'] = userInterest;
    })

    await User_social_profile.find({ user_id: user_id }).then((social) => {
      response['user_social_profile'] = social;
    })

    await Experience.find({ user_id: user_id }).then((course) => {
      response['user_course'] = course;
    })

    res.send({
      status: true,
      message: "data Successfully",
      respoonse: {
        user_course: response['user_course'],
        user_highlights: response['user_highlights'],
        user_education: response['user_education'],
        user_skills: response['user_skills'],
        user_languages: response['user_languages'],
        user_achievements: response['user_achievements'],
        user_interest: response['user_interest'],
        user_social_profile: response['user_social_profile']
      },
      self_intoduction: {
        unilife_user_name: unilife_user_name,
        profile_banner_image: profile_banner_image,
        university_schools_name: university_schools_name,
        user_type: user_type,
        profile_logo: profile_logo,
        profile_image: profile_image,
        university_school_email : university_school_email,
        username : username,
        university_school_id : university_school_id,
        designation : designation,
        organisation : organisation,
        personal_mission : personal_mission,
        personal_description : personal_description
        
       }
    });
    
  }
  else {
    res.send({
      status: false,
      ws: ws,
      message: "Invalid request"
  
    });
  }
  
});


app.post("/homepage_data", async function (req, res) {

  let user_id = req.body.user_id;
  let source = req.body.source;
  let version = req.body.version;
  let language = req.body.language;
  let ws = req.body.ws;
  //var postdata = [];
  var  up_id = '';
  var udata = [];
  var same_domain = [];
  var f_list = [];
  if(user_id) {
    if(source && version) {
      await Version.find({ _id: '6126216ffc198a178555d72f' }).then((vdata) => {
        let android_v = vdata[0].version;
        let ios_v = vdata[0].ios;

        if(source == 'android') {
          if (version > android_v) {
					  let adddata = {"android" : version};

            var myquery = { _id: '6126216ffc198a178555d72f' };
              var newvalues = { $set: {adddata} };
              Version.updateOne(myquery, newvalues, function (err, res) {

            });
            
          }

        }
        else if(source == 'ios') {
          if (version > android_v) {
					  let adddata = {"ios" : version};

              var myquery = { _id: '6126216ffc198a178555d72f' };
              var newvalues = { $set: {adddata} };
              Version.updateOne(myquery, newvalues, function (err, res) {

              });
          }
        }

        let versiondata = {"source" : source,
                           "version" : version

                           };

        var myquery = { _id: user_id };
        var newvalues = { $set: {versiondata} };
        User.updateOne(myquery, newvalues, function (err, res) {

        });
      });
    }

    // friend list code 

    await Friend_lists.find({ user_id: user_id }).then((ufriend) => {

      udata = ufriend;

    });

    await User.find({ _id: user_id }).then((userdata) => {
      
      if(userdata.length > 0) {
        let up_id = userdata[0].university_school_id;

        User.find({ university_school_id: up_id }, { "_id": 1 }).then((domaindata) => {
          same_domain = domaindata;
          // same domain user_id //
          if (same_domain.length > 0) {

            f_list = same_domain.toString();

          }
          
        });
      }
      

    });
    let userpost = [];
    const sort = { created_at: -1 }

    await Posts.find({ user_id: user_id }, {
      "_id": 1, "admin_id": 1, "user_id": 1, "university_post_id": 1, "caption": 1, "location_name": 1,
      "post_through_group": 1, "group_id": 1, "status": 1,
      "type": 1, "question": 1, "event_title": 1, "event_link": 1, "event_description": 1,
      "created_at": 1
    }, { "user_id": { $in: f_list } }).sort(sort).lean().then((userpostdata) => {
      
        userpost = userpostdata;  
       
      // $data = $this->custom_model->get_data_array("SELECT id,admin_id,user_id,university_post_id,caption,location_name,post_through_group,group_id,status,type,question,event_title,event_link,event_description,created_at FROM posts
      // WHERE  `user_id` IN ($f_list) AND `type` != '' OR (`admin_id` = '1' AND `university_post_id` = '$up_id' AND `type` != '' )  ORDER BY `id` DESC LIMIT $pagination,$limit ");
      // WHERE  `user_id` IN ($f_list) AND 
      //`type` != '' OR (`admin_id` = '1' AND
      // `university_post_id` = '$up_id' AND 
      //`type` != '' )
      // Posts.find({$and: [  ["type !=", '' ], [ {"university_post_id": up_id} ] ]}, {"_id":1, "admin_id":1,"user_id": 1,"university_post_id":1,"caption":1,"location_name":1,"post_through_group":1,"group_id":1,"status":1,"type":1,"question":1,"event_title":1,"event_link":1,"event_description":1,"created_at":1  }).then((pdata) => {
      
      
      // });
       

      });
      
      if(userpost.length > 0) {
        for(var i = 0 ; i < userpost.length; i++ ) {
          let user_id = userpost[i].user_id;
          let post_id = userpost[i]._id;
          userpost[i]["id"] = userpost[i]._id ;
          userpost[i]["groupId"] = {};
          // userpost[i]["event_register_count"] = 0;
          // userpost[i]["already_hit_button"] = 0;
          userpost[i]["is_like"] = false;
          userpost[i]["post_like_count"] = 0;
          userpost[i]["post_comments_count"] = 0;
            let get_udata = [];
              get_udata = get_user_data(user_id);
              
   	 					// if (get_udata.length > 0) 
   	 					// {
   	 					// 	userpost[i]['user_uploading_post'] = get_udata;
   	 					// }
   	 					// else
   	 					// {
   	 					// userpost[i]['user_uploading_post'] = get_udata;   	 						
   	 					// }
          
                userpost[i]["userUploadingPost"] = [{profile_image : "1628353733hrithik-roshan.jpg",
                                                username     : "test",
                                                created_at   : "2021-08-14 09:50:18"
                                              }];
                if(userpost[i].type == "poll") {
                  let selected_opt = [];
                  await Posts_options.find({ post_id: post_id }).lean().then((selected_option) => {
                      selected_opt = selected_option;
                        
                  });
                      
                    if(selected_opt.length > 0) {
                      for(var j = 0 ; j < selected_opt.length; j++ ) {
                        let option = [];
                        let op_id = selected_opt[j]._id;
                        await  Post_options_select_by_user.find({ post_id: post_id, user_id : user_id, option_id : op_id }).lean().then((option) => {
                            option = option;
                          });
                            if(option.length > 0) {
                              selected_opt[j]['selected'] = 'yes';
                            }
                            else {
                              selected_opt[j]['selected'] = 'no';
                            }
                            
                           let option_a = [];
                          await Post_options_select_by_user.find({ post_id: post_id, option_id : op_id }).lean().then((option_aa) => {
                            option_a = option_aa;
                          });
                          if(option_a.length > 0) {
                            selected_opt[j]['selected_count'] = option_a.length;
                          }
                          else {
                            selected_opt[j]['selected_count'] = 0;
                          }
                          selected_opt[j]['post_id'] = post_id;


                      }

                    }
                    // selected_opt
                  
                  userpost[i]['post_options'] = selected_opt;
                }
                
                if(userpost[i].type == "event") {
                  let ava = 0;
                  let reg_link_count = [];
                 await  Event_link_user_list.find({ event_id: post_id }).lean().then((reg_link_count) => {
                    reg_link_count = reg_link_count;
                  });
                  if(reg_link_count.length > 0) {
                    // $HiddenProducts = explode(',',$reg_link_count[0]['user_id']);
                    // if (in_array($user_id, $HiddenProducts)) 
                    // {
                    //   $ava = 'yes';
                    // }
                      //$data[$gkey]['event_register_count'] = $reg_link_count[0]['count'];
                      userpost[i]['event_register_count'] = reg_link_count[0].count;
                  }
                  else {
                    userpost[i]['event_register_count'] = 0;
                  }
                  userpost[i]['already_hit_button'] = ava;

                }

                let attachments = [];
                await Post_attachment.find({ post_id: post_id }).lean().then((attach) => {
                  attachments = attach;
                });
                if (attachments.lenth > 0) {
                  for(var j = 0 ; j < attachments.length; j++ ) {
                    let att = attachments[j]['attachment'];
                    if(att) {
                      attachments[j]['attachment'] = "http://ec2-15-206-103-14.ap-south-1.compute.amazonaws.com:5000/"+att;;
                    }
                    else {
                      attachments[j]['attachment'] = '';
                    }
                   }

                }
                userpost[i]["post_attachments"] = attachments;
         
          
        }

        res.send({
          status: true,
          ws: ws,
          message: "Successfully",
          data: userpost
          
        });

      }
      else {
        res.send({
          status: true,
          ws: ws,
          message: "Successfully",
          data: userpost
        });

      }
     //////
  }
  else {
    res.send({
      status: false,
      ws: ws,
      message: "Invalid request"

    });
  }
});

//  function get_attachment_image(image) {
//    if(image) {
//      let str = "http://ec2-15-206-103-14.ap-south-1.compute.amazonaws.com:5000/"+image;
//      return str;
//    }
		
//    	}

app.use(express.static('uploads'));
  app.get("/profile_imgs", async function (req, res) {
    var baseUrl = `${req.protocol}://${req.headers.host}`+"/";
    res.send({
      status: true,
      message: 'success',
      ws: "profile_imgs",
      data : baseUrl
    });


  });




app.post("/event_link_counter_hit", async function (req, res) {
  let event_id = req.body.event_id;
  let user_id = req.body.user_id;
  let language = req.body.language;
  let ws = req.body.ws;
  let additional_data = [];

  if (event_id != '' && user_id != '') {
    await Event_link_user_list.find({ event_id: event_id }, { "user_id": 1, "count": 1 }).then((old_users) => {

      if (old_users.length > 0) {
        count = old_users[0]['count'];
        u_id = old_users[0]['user_id'];
        // $myArray = explode(',', $u_id);
          let add_data = {};
        
          let new_count = count + 1;
          if(!u_id.includes(user_id)) {
            u_id = u_id+","+user_id;
            add_data['user_id'] = u_id;
          }
          add_data["count"] = new_count;

            var myquery = { _id: event_id };
              var newvalues = { $set: {adddata} };
              Event_link_user_list.updateOne(myquery, newvalues, function (err, res) {

            });
        
      }
      else {
        additional_data = {
          'count': 1,
          'user_id': user_id,
          'event_id': event_id

        }
        elink = new Event_link_user_list(additional_data);

        elink.save().then(() => {
          res.send({
            status: true,
            message: 'success',
            ws: ws
          });

        }).catch((e) => {
          res.send({
            status: false,
            message: 'failed' + e,
            ws: ws
          });
        })
        //result = $this->custom_model->my_insert($additional_data,"event_link_user_list");

      }

    });
  }

});


/******************************************* Admin panel api starts here *************************/


app.post("/adminlogin", (req, res) => {
  let adminid = req.body.username;
  let password = req.body.password;
  Admin_users.find({ email: adminid, password: password }).then((data) => {
    let userdata = data;
    if (userdata.length > 0) {
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





app.get("/userexport", (req, res) => {

  User.find({ "_id": 1, "Username": 1, "university_school_id": 1, "university_school_email": 1, "profile_status": 1, "Status": 1, "created_at": 1 }).then((pdata) => {
    let userdata = pdata; // for user data 
    if (userdata.length > 0) {

      res.send({
        status: true,
        message: "user export list",
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

app.get("/userlist", (req, res) => {
  User.find({})
    .then((data) => {
      let userdata = data; // for user data 
      if (userdata.length > 0) {

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

  var myquery = { _id: user_id };
  var newvalues = { $set: { token: token } };
  Admin_users.updateOne(myquery, newvalues, function (err, res) {

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

app.get("/dashboardlist", async function (req, res) {
  var dashData = [];
  var rusers = 0;
  var rdelete_users = 0;
  var roffers = 0;
  var rblogs = 0;
  var rbrands = 0;
  var rposts = 0;
  var rgroups = 0;
  var runiversity_schools = 0;

  await Coupon.find().sort({ _id: -1 }).limit(5)
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
    data: {
      'coupon': dashData,
      'users': rusers,
      'delete_users': rdelete_users,
      'offers': roffers,
      'blogs': rblogs,
      'brands': rbrands,
      'posts': rposts,
      'groups': rgroups,
      'university_schools': runiversity_schools
    }
  });


});


app.get("/schooluniversitylist", (req, res) => {
  University_schools.find()
    .then((data) => {
      let userdata = data;
      if (userdata.length > 0) {

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

  let username = req.body.username;
  let university_school_id = req.body.university_school_id;
  let university_school = req.body.university_school;
  let status = req.body.status;
  let password = req.body.password;
  let university_school_email = req.body.university_school_email;


  let userdata = {
    'university_school_id': university_school_id,
    'username': username,
    'university_school_email': university_school + university_school_email,
    'user_type': 0,
    'status': status,
    'password': password,
    'decoded_password': password

  }

  const user = new User(userdata);
  user.save().then(() => {
    res.send({
      status: true,
      message: "User inserted successfully"

    });

  }).catch((e) => {
    res.send({
      status: false,
      message: "Something went wrong!" + e

    });
  })

});

app.post("/getuserdetail", (req, res) => {

  let user_id = req.body.user_id;

  User.find({ _id: user_id })
    .then((data) => {
      let userdata = data;
      if (userdata.length > 0) {

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

  let user_id = req.body.user_id;
  let username = req.body.username;
  let university_school_id = req.body.university_school_id;
  let university_school = req.body.university_school;
  let status = req.body.status;
  let password = req.body.password;
  let university_school_email = req.body.university_school_email;


  let userdata = {
    'university_school_id': university_school_id,
    'username': username,
    'university_school_email': university_school + university_school_email,
    'user_type': 0,
    'status': status,
    'password': password,
    'decoded_password': password

  }

  var myquery = { _id: user_id };
  var newvalues = { $set: userdata };

  User.updateOne(myquery, newvalues).then(() => {
    res.send({
      status: true,
      message: "User updated successfully"

    });
  }).catch((e) => {
    res.send({
      status: false,
      message: "Something went wrong!" + e


    });
  })
});

app.post("/self-intro-update", (req, res) => {

  let user_id = req.body.user_id;
  let username = req.body.username;
  let status = req.body.status;
  let profile_status = req.body.headline;

  let userdata = {
    'username': username,
    'status': status,
    'profile_status': profile_status
  }

  var myquery = { _id: user_id };
  var newvalues = { $set: userdata };

  User.updateOne(myquery, newvalues).then(() => {
    res.send({
      status: true,
      message: "self-inro updated successfully"

    });
  }).catch((e) => {
    res.send({
      status: false,
      message: "Something went wrong!" + e

    });
  })
});

app.post("/personal-mission-update", (req, res) => {
  let user_id = req.body.user_id;
  let username = req.body.username;
  let status = req.body.status;
  let profile_status = req.body.headline;

  let userdata = {
    'username': username,
    'status': status,
    'profile_status': profile_status
  }

  var myquery = { _id: user_id };
  var newvalues = { $set: userdata };

  User.updateOne(myquery, newvalues).then(() => {
    res.send({
      status: true,
      message: "self-inro updated successfully"

    });
  }).catch((e) => {
    res.send({
      status: false,
      message: "Something went wrong!" + e

    });
  })


});

app.post("/personal-highlights-update", (req, res) => {

  let user_id = req.body.user_id;
  let currently_working = req.body.currently_working;
  let currently_studying = req.body.currently_studying;
  let graduated_from = req.body.graduated_from;
  let complete_highschool_at = req.body.complete_highschool_at;
  let lives_in = req.body.lives_in;
  let from = req.body.from;
  let personal_information = req.body.personal_information;


  //************ time stamp **************//
  let today = new Date();
  let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
  let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  let dateTime = date + ' ' + time;
  //************ time stamp *************** */


  let highdata = {
    "user_id": user_id,
    "currently_working": currently_working,
    "currently_studying": currently_studying,
    "graduated_from": graduated_from,
    "complete_highschool_at": complete_highschool_at,
    "lives_in": lives_in,
    "from": from,
    "personal_information": personal_information,
    "created_at": dateTime
  }

  const highlights = new Highlight(highdata);
  highlights.save().then(() => {
    res.send({
      status: true,
      message: "User highlights added successfully"

    });

  }).catch((e) => {
    res.send({
      status: false,
      message: "Something went wrong!" + e

    });
  })


});

app.post("/social-profile", (req, res) => {

  let user_id = req.body.user_id;
  let facebook = req.body.facebook;
  let instagram = req.body.instagram;
  let snapchat = req.body.snapchat;
  let twitter = req.body.twitter;
  let linkedIn = req.body.linkedIn;

  let socialdata = {
    "user_id": user_id,
    "facebook": facebook,
    "instagram": instagram,
    "snapchat": snapchat,
    "twitter": twitter,
    "linkedIn": linkedIn
  }

  const user_social_profile = new User_social_profile(socialdata);
  user_social_profile.save().then(() => {
    res.send({
      status: true,
      message: "social profile added successfully"

    });

  }).catch((e) => {
    res.send({
      status: false,
      message: "Something went wrong!" + e

    });
  })



});

app.post("/user-interest-update", (req, res) => {
  let user_id = req.body.user_id;
  let interest_name = req.body.interest_name;


  //************ time stamp **************//
  let today = new Date();
  let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
  let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  let dateTime = date + ' ' + time;
  //************ time stamp *************** */


  let interestdata = {
    "user_id": user_id,
    "interest_name": interest_name,
    "created_at": dateTime
  }

  const interest = new Interest(interestdata);
  interest.save().then(() => {
    res.send({
      status: true,
      message: "user interest added successfully"

    });

  }).catch((e) => {
    res.send({
      status: false,
      message: "Something went wrong!" + e

    });
  })


});

app.post("/user-languages-update", (req, res) => {
  let user_id = req.body.user_id;
  let language_name = req.body.language_name;

  //************ time stamp **************//
  let today = new Date();
  let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
  let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  let dateTime = date + ' ' + time;
  //************ time stamp *************** */

  let langdata = {
    "user_id": user_id,
    "language_name": language_name,
    "created_at": dateTime
  }

  const language = new Language(langdata);
  language.save().then(() => {
    res.send({
      status: true,
      message: "User Language added successfully"

    });

  }).catch((e) => {
    res.send({
      status: false,
      message: "Something went wrong!" + e

    });
  })


});

app.post("/user-course-update", (req, res) => {
  let user_id = req.body.user_id;
  let name = req.body.name;

  //************ time stamp **************//
  let today = new Date();
  let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
  let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  let dateTime = date + ' ' + time;
  //************ time stamp *************** */

  let coursedata = {
    "user_id": user_id,
    "name": name,
    "created_at": dateTime
  }

  const user_course = new User_course(coursedata);
  user_course.save().then(() => {
    res.send({
      status: true,
      message: "User Course added successfully"

    });

  }).catch((e) => {
    res.send({
      status: false,
      message: "Something went wrong!" + e

    });
  })


});



app.post("/education-list", (req, res) => {
  let user_id = req.body.user_id;
  Education.find({ user_id: user_id })
    .then((data) => {
      let userdata = data;
      if (userdata.length > 0) {
        res.send({
          status: true,
          message: "Education list",
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

app.post("/add-education", (req, res) => {
  let user_id = req.body.user_id;
  let college_name = req.body.college_name;
  let concentration = req.body.concentration;
  let degree = req.body.degree;
  let club_society = req.body.club_society;
  let grade = req.body.grade;
  let start_date = req.body.start_date;
  let end_date = req.body.end_date;



  //************ time stamp **************//
  let today = new Date();
  let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
  let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  let dateTime = date + ' ' + time;
  //************ time stamp *************** */

  let eduData = {
    "user_id": user_id,
    "college_name": college_name,
    "image": "",
    "concentration": concentration,
    "degree": degree,
    "club_society": club_society,
    "grade": grade,
    "start_date": start_date,
    "end_date": end_date,
    "created_at": dateTime
  };

  let education = new Education(eduData);
  education.save().then(() => {
    res.send(
      {
        status: true,
        message: 'Education added successfully'
      }
    );

  }).catch((e) => {
    res.send(
      {
        status: false,
        message: 'failed to save Education ' + e
      }
    );
  })


});

app.post("/experience-list", (req, res) => {
  let user_id = req.body.user_id;
  Experience.find({ user_id: user_id })
    .then((data) => {
      let userdata = data;
      if (userdata.length > 0) {
        res.send({
          status: true,
          message: "Experience list",
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

app.post("/add-experience", (req, res) => {
  let user_id = req.body.user_id;
  let company_name = req.body.company_name;
  let emp_type = req.body.emp_type;
  let industry = req.body.industry;
  let designation = req.body.designation;
  let location = req.body.location;
  let start_date = req.body.start_date;
  let end_date = req.body.end_date;



  //************ time stamp **************//
  let today = new Date();
  let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
  let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  let dateTime = date + ' ' + time;
  //************ time stamp *************** */

  let expData = {
    "user_id": user_id,
    "company_name": company_name,
    "image": "",
    "emp_type": emp_type,
    "industry": industry,
    "designation": designation,
    "location": location,
    "start_date": start_date,
    "end_date": end_date,
    "created_at": dateTime
  };

  let experience = new Experience(expData);
  experience.save().then(() => {
    res.send(
      {
        status: true,
        message: 'Experience added successfully'
      }
    );

  }).catch((e) => {
    res.send(
      {
        status: false,
        message: 'failed to save Experience ' + e
      }
    );
  })


});

app.post("/achievements-list", (req, res) => {
  let user_id = req.body.user_id;
  Achievement.find({ user_id: user_id })
    .then((data) => {
      let userdata = data;
      if (userdata.length > 0) {
        res.send({
          status: true,
          message: "Achievements list",
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

app.post("/add-achievements", (req, res) => {
  let user_id = req.body.user_id;
  let certificate_name = req.body.certificate_name;
  let offered_by = req.body.offered_by;
  let offered_date = req.body.offered_date;
  let duration = req.body.duration;

  //************ time stamp **************//
  let today = new Date();
  let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
  let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  let dateTime = date + ' ' + time;
  //************ time stamp *************** */

  let achieveData = {
    "user_id": user_id,
    "certificate_name": certificate_name,
    "offered_by": offered_by,
    "offered_date": offered_date,
    "duration": duration,
    "created_at": dateTime
  };

  let achievement = new Achievement(achieveData);
  achievement.save().then(() => {
    res.send(
      {
        status: true,
        message: 'Achievements added successfully'
      }
    );

  }).catch((e) => {
    res.send(
      {
        status: false,
        message: 'failed to save Achievements ' + e
      }
    );
  })

});



app.post("/deleteuser", (req, res) => {
  let user_id = req.body.user_id;
  User.remove({ _id: user_id })
    .then(() => {
      res.send({
        status: true,
        message: "User has been deleted"

      });

    })
    .catch((e) => {
      res.send({
        status: false,
        message: "user has failed to delete"

      });
    });

});

app.get("/deleteuserlist", (req, res) => {
  Delete_users.find()
    .then((data) => {
      let userdata = data;
      if (userdata.length > 0) {

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
  Friend_lists.find({ user_id: user_id })
    .then((data) => {
      let userdata = data;
      if (userdata.length > 0) {
        // userdata.forEach(function(u,i){
        //   var users = [];
        //   User.find({_id: userdata[i].user_id }, function(err, j) {
        //       if (err) throw err;
        //       if (!u) {
        //           res.end(JSON.stringify({
        //               status: 'failed:Auction not found.',
        //               error_code: '404'
        //           }));
        //           console.log("User not found.");
        //           return 
        //       }
        //       userdata[i].name.push(j);
        //   })
        // })

        res.send({
          status: true,
          message: "Friend list",
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

  // find all user friend id list 

  // get each user id //



});

//**************** Category apis ******************************* */

app.get("/category-list", (req, res) => {
  Categories.find()
    .then((data) => {
      let categorydata = data;
      if (categorydata.length > 0) {

        res.send({
          status: true,
          message: "Category list",
          data: categorydata,
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

app.post("/add-category", multer({ storage: storage }).single('image'), (req, res) => {

  let name = req.body.name;
  let image = req.body.image;
  let status = req.body.status;

  //************  time stamp  **************************/
  let today = new Date();
  let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
  let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  let dateTime = date + ' ' + time;

  let imagedata = req.file;
  //console.log(req.file);

  //************  time stamp  **************************/

  // need to upload image //


  let categorydata = {
    "name": name,
    "image": imagedata.filename,
    "status": status,
    "created_at": dateTime,
    "updated_at": dateTime
  };

  const category = new Categories(categorydata);
  category.save().then(() => {
    res.send(
      {
        status: true,
        message: 'Category added successfully'
      }
    );

  }).catch((e) => {
    res.send(
      {
        status: false,
        message: 'failed to save category ' + e
      }
    );
  })

});

app.post("/get-category", (req, res) => {
  let catid = req.body.id;

  Categories.find({ _id: catid })
    .then((data) => {
      let catData = data;
      if (catData.length > 0) {

        res.send({
          status: true,
          message: "Category details",
          data: catData,
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

app.put("/update-category", (req, res) => {

  let id = req.body.id;
  let name = req.body.name;
  let image = req.body.image;
  let status = req.body.status;

  //************  time stamp  **************************/
  let today = new Date();
  let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
  let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  let dateTime = date + ' ' + time;

  //************  time stamp  **************************/

  let userdata = {
    'name': name,
    'image': image,
    'status': status,
    'updated_at': dateTime
  };


  var myquery = { _id: id };
  var newvalues = { $set: userdata };

  Categories.updateOne(myquery, newvalues).then(() => {
    res.send({
      status: true,
      message: "Category updated successfully"

    });
  }).catch((e) => {
    res.send({
      status: false,
      message: "Something went wrong!" + e


    });
  })

});


app.post("/delete-category", (req, res) => {
  let catid = req.body.id;
  Categories.remove({ _id: catid })
    .then(() => {
      res.send({
        status: true,
        message: "Category has been deleted"

      });

    })
    .catch((e) => {
      res.send({
        status: false,
        message: "Category has failed to delete"

      });
    });

});

//**************** Category apis  ends ******************************* */

app.get("/about-us", (req, res) => {
  About.find()
    .then((data) => {
      let aboutusData = data;
      if (aboutusData.length > 0) {
        res.send({
          status: true,
          message: "About us",
          data: aboutusData,
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

app.put("/update-about-us", (req, res) => {

  let id = req.body._id;
  let about_us = req.body.about_us;
  let updated_at = req.body.updated_at;
  let data = {};
  if (about_us != "") {
    data = {
      "about_us": about_us,
      "updated_at": updated_at
    };
  }
  else {
    data = { "updated_at": updated_at };
  }
  var myquery = { _id: id };
  var newvalues = { $set: data };

  About.updateOne(myquery, newvalues).then(() => {
    res.send({
      status: true,
      message: "About us updated successfully"

    });
  }).catch((e) => {
    res.send({
      status: false,
      message: "Something went wrong!" + e

    });
  })

});


app.post("/update-account-info", (req, res) => {
  let user_id = req.body.user_id;
  let first_name = req.body.first_name
  let last_name = req.body.last_name

  let userdata = {
    "first_name": first_name,
    "last_name": last_name

  };

  var myquery = { _id: user_id };
  var newvalues = { $set: userdata };

  Admin_users.updateOne(myquery, newvalues).then(() => {
    res.send({
      status: true,
      message: "password  change successfully"

    });
  }).catch((e) => {
    res.send({
      status: false,
      message: "Something went wrong!" + e

    });
  })

});



app.post("/change-password", (req, res) => {
  let user_id = req.body.user_id;
  let new_password = req.body.new_password;

  let userdata = {
    "password": new_password,
    "password_show": new_password

  };

  var myquery = { _id: user_id };
  var newvalues = { $set: userdata };

  Admin_users.updateOne(myquery, newvalues).then(() => {
    res.send({
      status: true,
      message: "password  change successfully"

    });
  }).catch((e) => {
    res.send({
      status: false,
      message: "Something went wrong!" + e

    });
  })

});


app.post("/profile-pic", multer({ storage: storage }).single('profile_image'), (req, res) => {

  let user_id = req.body.user_id;
  let filedata = req.file;

  let profiledata = {
    "profile_image": filedata.filename

  };
  var myquery = { _id: user_id };
  var newvalues = { $set: profiledata };

  Admin_users.updateOne(myquery, newvalues).then(() => {
    res.send({
      status: true,
      message: "profile image update successfully"

    });
  }).catch((e) => {
    res.send({
      status: false,
      message: "Something went wrong!" + e

    });
  })

});


app.post("/contact-us", (req, res) => {
  let user_id = req.body.user_id;
  Contact_us.find({ user_id: user_id })
    .then((data) => {
      let contactusdata = data;
      if (contactusdata.length > 0) {
        res.send({
          status: true,
          message: "Contact us list",
          data: contactusdata,
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



app.post("/Feedback-list", (req, res) => {
  let user_id = req.body.user_id;
  Feedback.find({ user_id: user_id })
    .then((data) => {
      let feedbackdata = data;
      if (feedbackdata.length > 0) {
        res.send({
          status: true,
          message: "Feedback list",
          data: feedbackdata,
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


//**************** Brand apis ******************************* */
app.get("/brands-list", (req, res) => {
  Brands.find()
    .then((data) => {
      let bdata = data;
      if (bdata.length > 0) {
        res.send({
          status: true,
          message: "Brand list",
          data: bdata,
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

app.post("/add-brand", (req, res) => {

  let categories_id = req.body.categories_id;
  let brand_name = req.body.brand_name;
  let description = req.body.description;
  let image = req.body.image;
  let type = req.body.type;
  let facebook = req.body.facebook;
  let instagram = req.body.instagram;
  let twitter = req.body.twitter;
  let status = req.body.status;


  //************  time stamp  **************************/
  let today = new Date();
  let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
  let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  let dateTime = date + ' ' + time;

  //************  time stamp  **************************/

  let branddata = {
    "categories_id": categories_id,
    "brand_name": brand_name,
    "description": description,
    "image": image,
    "type": type,
    "facebook": facebook,
    "instagram": instagram,
    "twitter": twitter,
    "status": status,
    "created_at": dateTime,
    "updated_at": dateTime

  };
  const brands = new Brands(branddata);
  brands.save().then(() => {
    res.send(
      {
        status: true,
        message: 'Brand added successfully'
      }
    );

  }).catch((e) => {
    res.send(
      {
        status: false,
        message: 'failed to add Brand ' + e
      }
    );
  })
});


app.post("/get-brand", (req, res) => {
  let brandid = req.body.brandid;
  Brands.find({ _id: brandid })
    .then((data) => {
      let branddata = data;
      if (branddata.length > 0) {
        res.send({
          status: true,
          message: "Brand details",
          data: branddata,
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


app.put("/update-brand", (req, res) => {

  let id = req.body.id;
  let categories_id = req.body.categories_id;
  let brand_name = req.body.brand_name;
  let description = req.body.description;
  let image = req.body.image;
  let type = req.body.type;
  let facebook = req.body.facebook;
  let instagram = req.body.instagram;
  let twitter = req.body.twitter;
  let status = req.body.status;


  //************  time stamp  **************************/
  let today = new Date();
  let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
  let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  let dateTime = date + ' ' + time;

  //************  time stamp  **************************/

  let branddata = {
    "categories_id": categories_id,
    "brand_name": brand_name,
    "description": description,
    "image": image,
    "type": type,
    "facebook": facebook,
    "instagram": instagram,
    "twitter": twitter,
    "status": status,
    "updated_at": dateTime

  };
  var myquery = { _id: id };
  var newvalues = { $set: branddata };

  Brands.updateOne(myquery, newvalues).then(() => {
    res.send({
      status: true,
      message: "Brand updated successfully"

    });
  }).catch((e) => {
    res.send({
      status: false,
      message: "Something went wrong!" + e

    });
  })

});


app.post("/delete-brand", (req, res) => {
  let brandid = req.body.id;
  Brands.remove({ _id: brandid })
    .then(() => {
      res.send({
        status: true,
        message: "Brand has been deleted"

      });

    })
    .catch((e) => {
      res.send({
        status: false,
        message: "Brand has failed to delete"

      });
    });

});


app.get("/brand-banner-list", (req, res) => {
  Brand_banner.find()
    .then((data) => {
      let bdata = data;
      if (bdata.length > 0) {
        res.send({
          status: true,
          message: "Brand banner list",
          data: bdata,
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



//**************** Brand apis  ends ************************** */

//**************** Blog apis ******************************* */


app.get("/blogs-list", (req, res) => {
  Blogs.find()
    .then((data) => {
      let blogsdata = data;
      if (blogsdata.length > 0) {
        res.send({
          status: true,
          message: "Blog list",
          data: blogsdata,
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



app.get("/blog-banner-list", (req, res) => {
  Blog_banner.find()
    .then((data) => {
      let blogbannerdata = data;
      if (blogbannerdata.length > 0) {
        res.send({
          status: true,
          message: "Blog banner list",
          data: blogbannerdata,
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

app.post("/add-blog", (req, res) => {
  let categories_id = req.body.categories_id;
  let title = req.body.title;
  let description = req.body.description;
  let image = req.body.image;
  let shared_by = req.body.shared_by;
  let writer_image = req.body.writer_image;
  let video_link = req.body.video_link;
  let slider = req.body.slider;
  let status = req.body.status;


  //************  time stamp  **************************/
  let today = new Date();
  let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
  let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  let dateTime = date + ' ' + time;

  //************  time stamp  **************************/

  let blogdata = {
    "categories_id": categories_id,
    "title": title,
    "description": description,
    "image": image,
    "shared_by": shared_by,
    "writer_image": writer_image,
    "video_link": video_link,
    "slider": slider,
    "status": status,
    "created_at": dateTime,
    "updated_at": dateTime

  };
  const blogs = new Blogs(blogdata);
  blogs.save().then(() => {
    res.send(
      {
        status: true,
        message: 'Blog added successfully'
      }
    );

  }).catch((e) => {
    res.send(
      {
        status: false,
        message: 'failed to add Blog ' + e
      }
    );
  })


});

app.post("/get-blog", (req, res) => {
  let blogid = req.body.blogid;
  Blogs.find({ _id: blogid })
    .then((data) => {
      let blogdata = data;
      if (blogdata.length > 0) {

        res.send({
          status: true,
          message: "Blog details",
          data: blogdata,
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

app.post("/update-blog", (req, res) => {
  let id = req.body.id;
  let categories_id = req.body.categories_id;
  let title = req.body.title;
  let description = req.body.description;
  let image = req.body.image;
  let shared_by = req.body.shared_by;
  let writer_image = req.body.writer_image;
  let video_link = req.body.video_link;
  let slider = req.body.slider;
  let status = req.body.status;


  //************  time stamp  **************************/
  let today = new Date();
  let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
  let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  let dateTime = date + ' ' + time;

  //************  time stamp  **************************/

  let blogdata = {
    "categories_id": categories_id,
    "title": title,
    "description": description,
    "image": image,
    "shared_by": shared_by,
    "writer_image": writer_image,
    "video_link": video_link,
    "slider": slider,
    "status": status,
    "updated_at": dateTime

  };
  var myquery = { _id: id };
  var newvalues = { $set: blogdata };

  Blogs.updateOne(myquery, newvalues).then(() => {
    res.send({
      status: true,
      message: "Blog updated successfully"

    });
  }).catch((e) => {
    res.send({
      status: false,
      message: "Something went wrong!" + e

    });
  })


});

app.post("/delete-blog", (req, res) => {
  let blogid = req.body.id;
  Blogs.remove({ _id: blogid })
    .then(() => {
      res.send({
        status: true,
        message: "Blog has been deleted"

      });

    })
    .catch((e) => {
      res.send({
        status: false,
        message: "Blog has failed to delete"

      });
    });

});

//**************** Blog apis ends ******************************* */


app.post("/export-blog", (req, res) => {


});


//**************** Blog apis  ends ******************************* */


//**************** Posts apis  ends ******************************* */


app.get("/all-post-list", (req, res) => {

  Posts.find()
    .then((data) => {
      let postdata = data;
      if (postdata.length > 0) {

        res.send({
          status: true,
          message: "all Post list",
          data: postdata,
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


app.post("/posts-list", (req, res) => {
  let user_id = req.body.user_id;
  Posts.find({ user_id: user_id })
    .then((data) => {
      let postdata = data;
      if (postdata.length > 0) {

        res.send({
          status: true,
          message: "Post list",
          data: postdata,
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


app.post("/add-post", multer({ storage: storage }).single('group_image'), (req, res) => {



});





app.post("/delete-post", (req, res) => {
  let post_id = req.body.post_id;
  Posts.remove({ _id: post_id })
    .then(() => {
      res.send({
        status: true,
        message: "post has been deleted"

      });

    })
    .catch((e) => {
      res.send({
        status: false,
        message: "Post has failed to delete"

      });
    });

});




//**************** Posts apis  ends ******************************* */


app.get("/redeem-user-list", (req, res) => {
  Redeem_user.find()
    .then((data) => {
      let redeemuserData = data;
      if (redeemuserData.length > 0) {
        res.send({
          status: true,
          message: "Redeem user list",
          data: redeemuserData,
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



app.post("/delete-redeem-user", (req, res) => {
  let rid = req.body.rid;
  Redeem_user.remove({ _id: rid })
    .then(() => {
      res.send({
        status: true,
        message: "Redeem user has been deleted"

      });

    })
    .catch((e) => {
      res.send({
        status: false,
        message: "Redeem user has failed to delete"

      });
    });


});



app.get("/faq-list", (req, res) => {
  Faqs.find()
    .then((data) => {
      let faqdata = data;
      if (faqdata.length > 0) {
        res.send({
          status: true,
          message: "Faq list",
          data: faqdata,
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


app.post("/add-faq", (req, res) => {
  let question = req.body.question;
  let answer = req.body.answer;
  let status = req.body.status;


  //************  time stamp  **************************/
  let today = new Date();
  let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
  let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  let dateTime = date + ' ' + time;

  //************  time stamp  **************************/

  let faqdata = {
    'questions': question,
    "answer": answer,
    "status": status,
    "created_at": dateTime,
    "updated_at": dateTime
  };

  const faqs = new Faqs(faqdata);
  faqs.save().then(() => {
    res.send({
      status: true,
      message: "Faq saved successfully"

    });

  }).catch((e) => {
    res.send({
      status: false,
      message: "Something went wrong!" + e

    });
  })



});


//************  group apis *************************/

app.get("/group-list", (req, res) => {
  Groups.find()
    .then((data) => {
      let groupdata = data;
      if (groupdata.length > 0) {
        res.send({
          status: true,
          message: "Group list",
          data: groupdata,
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


app.post("/add-group", multer({ storage: storage }).single('group_image'), (req, res) => {

  let group_name = req.body.group_name;
  let university_group_id = req.body.university_group_id;
  let created_by = req.body.created_by;
  let status = req.body.status;
  let groupfile = req.file;
  let groupusers = req.body.groupusers;


  //************  time stamp  **************************/
  let today = new Date();
  let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
  let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  let dateTime = date + ' ' + time;

  //************  time stamp  **************************/

  let groupdata = {
    "group_name": group_name,
    "university_group_id": university_group_id,
    "created_by": created_by,
    "group_image": groupfile.filename,
    "status": status,
    "created_at": dateTime,
    "updated_at": dateTime

  };
  const groups = new Groups(groupdata);
  groups.save().then(() => {
    res.send({
      status: true,
      message: "Group has been cretaed successfully"

    });
  }).catch((e) => {
    res.send({
      status: false,
      message: "Something went wrong!" + e

    });
  })


});



//************  group apis ends *************************/


app.get("/terms-conditions", (req, res) => {
  Terms.find()
    .then((data) => {
      let termsdata = data;
      if (termsdata.length > 0) {
        res.send({
          status: true,
          message: "Term and Conditions",
          data: termsdata,
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

app.put("/update-terms-conditions", (req, res) => {

  let id = req.body._id;
  let terms = req.body.terms;
  let updated_at = req.body.updated_at;
  let data = {};
  if (terms != "") {
    data = {
      "term_condition": about_us,
      "updated_at": updated_at
    };
  }
  else {
    data = { "updated_at": updated_at };
  }
  var myquery = { _id: id };
  var newvalues = { $set: data };

  Terms.updateOne(myquery, newvalues).then(() => {
    res.send({
      status: true,
      message: "Terms and Conditions updated successfully"

    });
  }).catch((e) => {
    res.send({
      status: false,
      message: "Something went wrong! " + e

    });
  })

});


//***************  Blog banner  ****************************/

app.post("/add-blog-banner", multer({ storage: storage }).single('image'), (req, res) => {

  let status = req.body.status;
  let imagedata = req.file;

  //************  time stamp  **************************/
  let today = new Date();
  let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
  let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  let dateTime = date + ' ' + time;

  //************  time stamp  **************************/

  let blogBannerData = {
    "status": status,
    "image": imagedata.filename,
    "created_date": dateTime

  };
  const Blog_banner = new blog_banner(blogBannerData);
  Blog_banner.save().then(() => {
    res.send({
      status: true,
      message: "Blog banner saved successfully"

    });
  }).catch((e) => {
    res.send({
      status: false,
      message: "Something went wrong!" + e

    });
  })

});



app.post("/update-blog-banner", multer({ storage: storage }).single('image'), (req, res) => {

  let bid = req.body.bid;
  let status = req.body.status;
  let imagedata = req.file;

  //************  time stamp  **************************/
  let today = new Date();
  let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
  let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  let dateTime = date + ' ' + time;

  //************  time stamp  **************************/

  let blogBannerData = {
    "status": status,
    "image": imagedata.filename,
    "created_date": dateTime

  };

  var myquery = { _id: bid };
  var newvalues = { $set: blogBannerData };

  Blog_banner.updateOne(myquery, newvalues).then(() => {
    res.send({
      status: true,
      message: "Blog banner updated successfully"

    });
  }).catch((e) => {
    res.send({
      status: false,
      message: "Something went wrong! " + e

    });
  })
});


app.post("/delete-blog-banner", (req, res) => {
  let bid = req.body.bid;
  Blog_banner.remove({ _id: bid })
    .then(() => {
      res.send({
        status: true,
        message: "Blog banner has been deleted"

      });

    })
    .catch((e) => {
      res.send({
        status: false,
        message: "Blog banner has failed to delete"

      });
    });

});


//***************  Blog Banner ends *********************** */

//**************************Manoj APIs starts******************************/

app.post("/create_group", multer({ storage: storage }).single('group_image'), (req, res) => {
  let group_name = req.body.group_name;
  let university_group_id = req.body.university_group_id;
  let created_by = req.body.created_by;
  let status = req.body.status;
  let groupfile = req.file;
  let groupusers = req.body.groupusers;


  let today = new Date();
  let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
  let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  let dateTime = date + ' ' + time;

  let groupdata = {
    "group_name": group_name,
    "university_group_id": university_group_id,
    "created_by": created_by,
    "group_image": groupfile.filename,
    "status": status,
    "created_at": dateTime,
    "updated_at": dateTime
  };
  const groups = new Groups(groupdata);
  groups.save().then(() => {
    res.send({
      status: true,
      message: "Group has been cretaed successfully"

    });
  }).catch((e) => {
    res.send({
      status: false,
      message: "Something went wrong!" + e

    });
  })


});

app.post("/report_post", (req, res) => {
  
  let user_id = req.body.user_id;
  let report_post_id = req.body.report_post_id;
  let type = req.body.type;
  let reason = req.body.reason;
  let language = "en";
  let ws = "report_post";

  let today = new Date();
  let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
  let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  let dateTime = date + ' ' + time;

  if(user_id && report_post_id) {
      Posts.find({_id : report_post_id })
        .then((postsdata) => {
          
        let uid = postsdata[0]._id;
        if(user_id == uid) {
          res.send({
            status : false,
            message : "You can not report by your self .",
            ws : ws
          });
        }
        else {

          let userpost = {"user_id"       : user_id,
                          "report_post_id" : report_post_id,
                          "type"          : type,
                          "reason"        : reason,
                          "created_at"    : dateTime

                        };
          const report_user_post = new Report_user_post(userpost);
          report_user_post.save().then(() => {
            res.send({
              status: true,
              message: "Thanks for letting us know , Your feedback is important in helping us keep the unilife community safe.",
              ws: ws
            });
          }).catch((e) => {
            res.send({
              status: false,
              message: "Something went wrong!" + e,
              ws: ws
            });
          })
            

        }
        

      })
      .catch((e) => {
        res.send({
          status : false,
          message : "error"+e,
          ws : ws
        });
      });
    
  }
  else {
    res.send({
      status : false,
      message: "user id and report post id is required.",
      ws      : ws

      });
  }
});

app.post("/report_user", (req, res) => {

  let report_user_id  = req.body.report_user_id;
  let user_id         = req.body.user_id;
  let type            = req.body.type;
  let reason          = req.body.reason;
  let language = "en";
  let ws = "report_user";

  let today = new Date();
  let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
  let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  let dateTime = date + ' ' + time;
  
  if (report_user_id) {

    if(report_user_id != user_id) {
      
      Report_user_post.find({report_user_id : report_user_id , user_id : user_id })
        .then((reportdata) => {
          if (reportdata.length == 0) {

            let reportArr = {"user_id" : user_id,
                            "report_user_id" : report_user_id,
                            "type"      : type,
                            "reason"    : reason,
                            "created_at" : dateTime

                             };
            const report_user_post = new Report_user_post(reportArr);
              report_user_post.save().then(() => {
                res.send({
                  status: true,
                  message: "Thanks for letting us know , Your feedback is important in helping us keep the unilife community safe.",
                  ws: ws
                });
              }).catch((e) => {
                res.send({
                  status: false,
                  message: "Something went wrong!" + e,
                  ws: ws
                });
              })

            
          } else {
            res.send({
              status: false,
              message: "You already reported this user so cant add again.",
              ws: ws
            });
          }

        })
        .catch((e) => {
          res.send({
            status : false,
            message : "error"+e,
            ws : ws
          });
        });

    }
    else {
      res.send({
        status : false,
        message: "You can not report by your self.",
        ws      : ws
  
        });
      
    }
  }
  else {
    res.send({
      status : false,
      message: "report_user_id is required.",
      ws      : ws

      });
  }
});

app.post("/create_poll", (req, res) => {
  
  let user_id = req.body.user_id;
  let group_id = req.body.group_id;
  let question = req.body.question;
  let options = req.body.options
  let language = 'en';
  let ws        = 'create_poll';
  let post_through_group = "";
  let university_school_id = "";

  let today = new Date();
  let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
  let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  let dateTime = date + ' ' + time;

  if(user_id) {
    if(group_id){
      post_through_group = "yes";
    }
    else {
      post_through_group = "no";
    }

    if(options) {
      User.find({ _id: user_id })
        .then((data) => {
          university_school_id = data[0].university_school_id;

          let postdata = {"group_id" : group_id,
                          "post_through_group" : post_through_group,
                          "user_id"    : user_id,
                          "question"   : question,
                          "university_post_id" : university_school_id,
                          "type"          : "poll",
                          "caption"    : "",
                          "location_name"  : "",
                          "status"          : "active",
                          "event_title"     : "",
                          "event_link"      : "",
                          "event_description" : "",
                          "created_at"      : dateTime,
                          "updated_at"      : dateTime

                          }
            
          const posts = new Posts(postdata);
          posts.save().then((pdata) => {
            let id = pdata._id;
            
            if(options.length > 0) {
               //for (let type of options) {
                 for(let i = 0; i < options.length ; i++) {
                 let optiondata = {"user_id" : user_id,
                                    "options" : options[i]['option'],
                                    "post_id" : id.toString()

                                  }
                   console.log(optiondata);
                    const posts_options = new Posts_options(optiondata);
                    posts_options.save().then(() => {
                      

                    }).catch((e) => {
                    
                    })
              }
              res.send({
                        status: true,
                        message: "Post added successfully"
                      });

            }
            
          }).catch((e) => {
            res.send({
              status: false,
              message: "Something went wrong!" + e
            });
          })
        }).catch((e) => {
          res.send({
            status: false,
            message: "Something went wrong!" + e
          });

        });

    }
    else {
      res.send({
        status   : false ,
        ws       : ws ,
        message  : 'Invalid resuest'
      });

    }

  }
  else {
    res.send({
      status : false ,
      ws      : ws ,
      message : 'Invalid resuest'
    });

  }
});

app.post('/create_event', multer({ storage: storage }).single('image'), (req, res) => {
  let event_title = req.body.event_title;
  let event_link = req.body.event_link;
  let event_description = req.body.event_description;
  //let event_images = req.file;
  let event_images = 0;
  let group_id = req.body.group_id;
  let user_id = req.body.user_id;
  let university_post_id = req.body.university_post_id;
  let language = "en"; // en
  let ws = req.body.ws; // create_event
  let post_through_group = "";
  let university_school_id = "";

  let today = new Date();
  let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
  let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  let dateTime = date + ' ' + time;

  
  if(user_id) {
    if(group_id){
      // check_group_available_not function params: user_id, group_id
      post_through_group = "yes";
    }
    else {
      post_through_group = "no";
    }
    User.find({ _id: user_id })
        .then((data) => {
          university_school_id = data[0].university_school_id;

          let eventdata = {"group_id" : group_id,
                          "post_through_group" : post_through_group,
                          "user_id"    : user_id,
                          "question"   : "",
                          "university_post_id" : university_school_id,
                          "type"          : "event",
                          "caption"    : "",
                          "location_name"  : "",
                          "status"          : "active",
                          "event_title"     : event_title,
                          "event_link"      : event_link,
                          "event_description" : event_description,
                          "created_at"      : dateTime,
                          "updated_at"      : dateTime

                          }
         
          const posts = new Posts(eventdata);
          posts.save().then((pdata) => {
            let id = pdata._id;
              if(event_images) {  
                 let optiondata = {"attachment" : event_images.filename,
                                    "attachment_type" : "image",
                                    "post_id" : id

                                  }
                    // post_attachments
                    const posts_attach = new Post_attachment(optiondata);
                    posts_attach.save().then(() => {
                      res.send({
                        status: true,
                        ws    : ws,
                        message: "Event added successfully"
                      });
                     

                    }).catch((e) => {
                      res.send({
                        status: false,
                        ws    : ws,
                        message: " event attachment failed to save"
                      });
                      

                    })
                }

            res.send({
              status: true,
              ws    : ws,
              message: "event added successfully"
            });
            
          }).catch((e) => {
            res.send({
              status: false,
              message: "Something went wrong!" + e
            });
          })
        }).catch((e) => {
          res.send({
            status: false,
            message: "Something went wrong!" + e
          });

        });
   
  }
  else {
    res.send({
      status : false ,
      ws      : ws ,
      message : 'Invalid resuest'
    });

  }

});


app.post("/delete_post", (req, res) => {

  res.send({
    status: false,
    message: "Something went wrong!"
  });

});

app.post("/profile_update", (req, res) => {

  res.send({
    status: false,
    message: "Something went wrong!"
  });

});

app.post("/categories_view_all_in_brand", (req, res) => {


});



app.post("/add_comment", async function (req , res)  {
  let user_id = req.body.user_id;
  let post_id = req.body.post_id;
  let comment = req.body.comment;
  let ws = "add_comment";

  let userpostdata = [];
  let comData     = [];

   //************  time stamp  **************************/
   let today = new Date();
   let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
   let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
   let dateTime = date + ' ' + time;
 
   //************  time stamp  **************************/

    let commentData = {"user_id"     : user_id,
                      "post_id"     : post_id,
                      "comment"     : comment,
                      "created_at"  : dateTime,
                      "updated_at"  : dateTime

                      };

        const comments = new Comments(commentData);
        comments.save().then(() => {
          
            
            
                // res.send({
                //     status: true,
                //     message: "comment success",
                //     ws      : ws,
                //     data    : [ { _id  : "3456785434567875",
                //                   comment : "vvgvg",
                //                   created_by :  "",
                //                   user_id   : "3456785434567875",
                //                   user_data : [{profile_image : "1628353733hrithik-roshan.jpg",
                //                                 username     : "test",
                //                                 created_at   : "2021-08-14 09:50:18"
                //                               } ],
                //                   like_users : [],
                //                   likeUsersCount :  0,
                //                   is_like :  false,
                //                   reply_count : 0,
                //                   reply_comment : []
                //                 }]
                //     });
  
        })
        // .catch((e) => {
        //   res.send({
        //     status: false,
        //     message: "something went wrong " + e
  
        //   });
        // });   

        await Comments.find({ post_id: post_id } ).lean().sort({_id: -1}).then((commentsData) => {
          comData = commentsData;
          
        })

        if(comData.length > 0) {
          let comment_user_data = '1628353733hrithik-roshan.jpg';
          let reply  = [];
          for(let i = 0; i < comData.length ; i++ ) {
  
              User.find({ _id: comData[i].user_id } ).lean().then((profiledata) => {
      
              if(profiledata.length > 0) {
                comment_user_data =  profiledata[0].profile_image;
              }
              
            })

            comData[i]['user_data']  = [{profile_image : "1628353733hrithik-roshan.jpg",
                                                username     : "test",
                                                created_at   : "2021-08-14 09:50:18"
                                              } ];
                                  
            comData[i]['like_users'] 	= [];                   
          comData[i]['is_like'] 	= false;
  
          await Comment_replies.find({ comment_id: comData[i]._id } ).lean().sort({_id: -1}).then((replyData) => {
            reply = replyData;
  
            if(reply.length > 0) {
              for (let index = 0; index < reply.length; index++) {
                let reply_uid = $rvalue['user_id'];
                let reply_cid = $rvalue['id'];
                 reply[i]['is_like'] = false;
                   
  
                  
              }
  
            }
            comData[i]['reply_count'] = reply.length;
            comData[i]['reply_comment'] = reply;
            
          })
  
          }
  
          res.send({
            status: true,
            ws     : "add_comment",
            message: "Successfully",
            data  : comData
          });
  
          
            
        }
        else {
          res.send({
            status: true,
            ws     : "add_comment",
            message: "No comments available",
            data  : comData
          });
  
        }


});


app.post("/get_post_comment", async function (req , res)  {
  let post_id     = req.body.post_id;
  let language    = "en";
  let ws          = req.body.ws;
  let user_id     = req.body.user_id;
  let userpostdata = [];
  let comData     = [];
	if(user_id) {
    await Posts.find({ _id: post_id } ).lean().then((postdata) => {
      userpostdata = postdata;
    })

    if(userpostdata.length > 0) {
      await Comments.find({ post_id: post_id } ).lean().sort({_id: -1}).then((commentsData) => {
        comData = commentsData;
        
      })
      if(comData.length > 0) {
        let comment_user_data = '1628353733hrithik-roshan.jpg';
        let reply  = [];
        for(let i = 0; i < comData.length ; i++ ) {

            User.find({ _id: comData[i].user_id } ).lean().then((profiledata) => {
    
            if(profiledata.length > 0) {
              comment_user_data =  profiledata[0].profile_image;
            }
            
          })
          // get_comment_likes($cvalue['id'])

        comData[i]['user_data'] 	= comment_user_data;
        comData[i]['like_users'] 	= '';
        comData[i]['like_users_count'] 	= 0;

        // is_in_wish_list_child($cvalue['user_id'],$comment_id)
        comData[i]['is_like'] 	= false;

        await Comment_replies.find({ comment_id: comData[i]._id } ).lean().sort({_id: -1}).then((replyData) => {
          reply = replyData;

          if(reply.length > 0) {
            for (let index = 0; index < reply.length; index++) {
              let reply_uid = $rvalue['user_id'];
							let reply_cid = $rvalue['id'];

                  reply[i]['is_like'] = false;
                  reply[i]['user_data'] = ''
                  reply[i]['like_users_reply'] = ''
                  reply[i]['like_users_count_reply'] = 0;

                // $is_in_wis_child = $this->is_in_wish_list_child_reply($reply_uid,$reply_cid);
								// $reply[$rkey]['is_like'] = $is_in_wis_child;

								// $reply_user_data = $this->get_user_data($reply_uid);
								// $reply[$rkey]['user_data'] 	= $reply_user_data;

								// $get_nlikes = $this->get_comment_likes($rvalue['comment_id']);
								// $reply[$rkey]['like_users_reply'] 	= $get_nlikes;
								// $reply[$rkey]['like_users_count_reply'] 	= count($get_nlikes);

            }

          }
          comData[i]['reply_count'] = reply.length;
					comData[i]['reply_comment'] = reply;
          
        })

        }

        res.send({
          status: true,
          ws     : "get_post_comment",
          message: "Successfully",
          data  : comData
        });

        
          
      }
      else {
        res.send({
          status: true,
          ws     : "get_post_comment",
          message: "No comments available",
          data  : ''
        });

      }
      
    }
    else {
       res.send({
        status: false,
        ws     : "get_post_comment",
        message: "Invalid request"
      });

    }
  
  }
  else {
    res.send({
      status: false,
      ws     : "get_post_comment",
      message: "Invalid request"
    });
  }

});


async function get_user_data(uid) {
  let data = '';
  
  if(uid) {
    await   User.find({ _id: uid } ).lean().then((userdata) => {
      
        if(userdata.length > 0) {
          return userdata[0].profile_image;
        }
        else {
          return data;
        }
    })
  }
  else {
    return data;
  }
}


app.post("/like_unlike_post", async function (req , res)  {
  let post_id     = req.body.post_id;
  let language    = "en";
  let user_id     = req.body.user_id;
  let ws          = "like_unlike_post";
  let type        = "P";

  let alldata = [];
  let count   = 0;

  //************  time stamp  **************************/
  let today = new Date();
  let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
  let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  let dateTime = date + ' ' + time;

  //************  time stamp  **************************/

    await  Post_comment_likes.find({ post_comment_id: post_id, user_id : user_id } ).lean().then((lcdata) => {
     
      if(lcdata.length > 0) {
        Post_comment_likes.deleteOne({ post_comment_id: post_id, user_id : user_id })
          .then((data) => { 
            
          })
        
      }
      else {
        let post_comment = {"post_comment_id" : post_id,
                      "user_id"         : user_id,
                      "type"            : type,
                      "created_at"      : dateTime,
                      "updated_at"      : dateTime
                      };
       const post_l_c = new Post_comment_likes(post_comment);
       post_l_c.save().then((data) => {
         
       })
 
      }
    })

    
    await  Post_comment_likes.find({ post_comment_id: post_id } ).lean().then((useralldata) => {
      
      console.log(useralldata);
      alldata = useralldata;
      count = useralldata.length;

    })

      console.log(alldata);
     res.send({
        response: true,
        ws     : "like_unlike_post",
        message: "success",
        data    : {"count" : count,
                   "rows" : []

                  }
      });
    

});



//check_group_available_not
//is_in_wish_list_parent
//is_report_post
//is_in_wish_list_child
//is_in_wish_list_child_reply
// select_poll_option
// delete_post
//create_opinion
//upload_post_images
// upload_image
// get_post_comment
//get_attachment_image
//get_profile_path
//get_blog_banner
//get_brand_image
//get_uploded_image
//get_user_data
//get_comment_likes
// get_banner
//get_social_media_post
//remove_member_from_group
//friend_req_listing
//friend_req_accept_reject
//send_emoji
//university_schools_list
//friend_request_send_listing
//brand_detail
//redeem_voucher
//brand_data
//categories_view_all_in_brand
//categories_wise_offers_data
