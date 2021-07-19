const router = require('express').Router();
const fetch = require('node-fetch')
const {Octokit} = require('@octokit/rest')


let Commit = require('../models/commits');

router.route('/').get((req,res)=>{
  Commit.find()
  .then(commits => res.json(commits))
  .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/commit').get((req,res)=>{
	res.send('Hola commits')
})

router.route('/commit_list').get(async (req,res)=>{
	var gDate = new Date();
      //fecha
      var year = gDate.getFullYear();
      var month = gDate.getMonth()+1;
      var dt = gDate.getDate();

      if (dt < 10) {
          dt = '0' + dt;
      }
      if (month < 10) {
          month = '0' + month;
      }

      var _date = year+'-' + month + '-'+dt;

      //hour
      var hours = gDate.getHours();
      var minutes = gDate.getMinutes();
      var ampm = hours >= 12 ? 'pm' : 'am';
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      minutes = minutes < 10 ? '0'+minutes : minutes;

      var _strTime = hours + ':' + minutes + ' ' + ampm;

      var nh = gDate.getHours();
      var nm = gDate.getMinutes();
      var ns = gDate.getSeconds();

      if(nh < 10){
          nh = '0' + nh;
      }

      if(nm < 10){
          nm = '0' + nm;
      }

      if(ns < 10){
          ns = '0' + ns;
      }

      var createdAt = _date + ' ' + nh + ':' + nm + ':' + ns;

  /*let url = 'https://api.github.com/repos/ferjomagra/FulltimeForce';
  let settings = {method: "get"};*/

  const octokit = new Octokit();

  
  const getinfo = await octokit.request('GET /repos/Ferjomagra/FulltimeForce', {
    owner: 'Ferjomagra',
    repo: 'FulltimeForce'
  })

  const data = getinfo
  //res.send(data)

  var commits = new Commit({
    tdata: JSON.stringify(data),
    name: JSON.stringify(data.data.name),
    id_repo: JSON.stringify(data.data.id),
    created_at: JSON.stringify(data.headers.date),
    html_url: 'https://github.com/Ferjomagra/FulltimeForce',
    api_url: 'https://api.github.com/repos/ferjomagra/FulltimeForce',
    date: gDate,
    current_date: createdAt
  })
  //console.log(commits)
  commits.save().then(
    () =>{
      res.json(commits)
    }
  ).catch(
    (error) =>{
      res.status(400).json({
        error: error
      })
    }
  )
})


module.exports = router;