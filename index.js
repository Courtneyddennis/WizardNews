const express = require('express');
const app= express()

const morgan = require('morgan');
app.use(morgan('dev'))


app.use(express.json())


const cors = require('cors');
app.use(cors())

app.listen(3000,()=>{
    console.log("server is running...")
})

const postBank = require("./postBank")

app.use(express.static(__dirname + "/public"))


app.get("/",(req,res)=>{
    console.log("made it to the root!")
    res.send('<div>Welcome, Earthlings!</div>')

})


app.get("/posts",(req,res)=>{
    const posts = postBank.list()
    const news= 
    
    `<!DOCTYPE html>
    <html>
    <head>
        <title>Wizard News</title>
        <link rel="stylesheet" href="/style.css" />
    </head>
    <body>
        <div class="news-list">
        <header><img src="/logo.png"/>Wizard News</header>
        ${posts
          .map(
            (post) => {
             
            return(
                `<div class='news-item'>
               <p>
               <span class="news-position">${post.id}. ▲</span><a href="/posts/${post.id}">${post.title}</a>
    
               <small>(by ${post.name})</small>
               </p>
               <small class="news-info">
               ${post.upvotes} upvotes | ${post.date}
               </small>
               </div>`
                
            )}
          )
          .join("")}
        </div>
    </body>
    </html>`
    res.send(news)

})


app.get("/posts/:id",(req,res,next)=>{
    const{id} = req.params;
    const singlePost = postBank.find(id)
    console.log(singlePost)
    // res.send(`<div>Looky here at this ${id} post!</div>`)}

    if(!singlePost.id){
        next()
    }else{
        res.send(`<!DOCTYPE html>
        <html>
        <head>
            <title>Wizard News</title>
            <link rel="stylesheet" href="/style.css" />
        </head>
        <body>
            <div class="news-list">
            <header><img src="/logo.png"/>Wizard News</header>
              <div class='news-item'>
                   <p>
                   <span class="news-position">${singlePost.id}. ▲</span><a href="/posts/${singlePost.id}">${singlePost.title}</a>
        
                   <small>(by ${singlePost.name})</small>
                   </p>
                   <small class="news-info">
                   ${singlePost.upvotes} upvotes | ${singlePost.date}
                   </small>
                   </div>
            </div>
        </body>
        </html>`)
    }
    
})
    
app.get("*",(req,res)=>{
   badNews=
   `<!DOCTYPE html>
   <html>
   <head>
     <title>Wizard News</title>
     <link rel="stylesheet" href="/style.css" />
   </head>
   <body>
     <header><img src="/logo.png"/>Wizard News</header>
     <div class="not-found">
       <p>Accio Page! 🧙‍♀️ ... Page Not Found, Little Wizzard!
       </p>
     </div>
   </body>
   </html>`

res.send(badNews)

})