'use strict';
const IssueModel = require('../issue_model.js')

module.exports = function (app) {
  const issueModel = new IssueModel();

  app.route('/api/issues/:project')
  
    .get(async function (req, res){
      let filter = req.query;
      filter.project = req.params.project
      const issues = await issueModel.getAllIssues(filter);
      return res.json(issues);
    })
    
    .post(async function (req, res){
      let project = req.params.project;
      if (issueModel.verifyEntry(req.body)){
        const issue = await issueModel.createIssue(project, req.body);
        //return res.json(issue)
        return res.json({
          _id: issue._id,
          issue_title: issue.issue_title ? issue.issue_title : '',
          issue_text: issue.issue_text ? issue.issue_text : '',
          created_on: issue.created_on,
          updated_on: issue.updated_on,
          created_by: issue.created_by ? issue.created_by : '',
          assigned_to: issue.assigned_to ? issue.assigned_to : '',
          open: issue.open,
          status_text: issue.status_text ? issue.status_text : ''
        })
      } else {
        return res.json({ error: 'required field(s) missing' })
      }
      
    })
    
    .put(async function (req, res){
      let project = req.params.project;
      /if (!req.body._id) {
        return res.json({ error: 'missing _id' })
      } else {
        let update = {
          _id: req.body._id,
          updated_on: issueModel.formatDate(),
        }
        let newUpdates = false;
        if (req.body.issue_title !== '') {
          update.issue_title = req.body.issue_title;
          newUpdates = true;
        }
        if (req.body.issue_text !== '') {
          update.issue_text = req.body.issue_text;
          newUpdates = true;
        }
        if (req.body.created_by !== '') {
          update.created_by = req.body.created_by;
          newUpdates = true;
        }
        if (req.body.assigned_to !== '') {
          update.assigned_to = req.body.assigned_to;
          newUpdates = true;
        }
        if (req.body.status_text !== '') {
          update.status_text = req.body.status_text;
          newUpdates = true;
        }
        if (req.body.open === 'false') {
          update.open = false;
          newUpdates = true;
        }
        console.log(newUpdates)
  
        if (newUpdates) {
          const result = await issueModel.updateIssue( {_id: req.body._id }, update);
          if (result.n === 1) {
            return res.json({ result: 'successfully updated', '_id': req.body._id })
          } else {
            console.log("error: 'could not update', '_id': ", req.body._id)
            return res.json({ error: 'could not update', '_id': req.body._id })
          }
        } else {
          return res.json({ error: 'no update field(s) sent', '_id': req.body._id })
        }
      }
    })
    
    .delete(async function (req, res){
      let project = req.params.project;
      if (!req.body._id) {
        return res.json({ error: 'missing _id' })
      } else {
        const result = await issueModel.deleteIssue(req.body._id);
        if (result.deletedCount == 1) {
          return res.json({ result: 'successfully deleted', '_id': req.body._id }) 
        } else {
          return res.json({ error: 'could not delete', '_id': req.body._id })
        }
      }
      
      
    });
    
};
