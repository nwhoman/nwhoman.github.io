const express     = require('express');
const bodyParser  = require('body-parser');
const expect      = require('chai').expect;
const cors        = require('cors');
require('dotenv').config();
const mongoose = require('mongoose');
mongoose.connect(
    process.env.MONGODB_CONNECT_STRING,
    { useNewUrlParser: true,
        useUnifiedTopology: true 
     }
);

const db = mongoose.connection;

const issueSchema = mongoose.Schema({
    project: {type: String, required: true},
    issue_title: {type: String, required: true},
    issue_text: {type: String, required: true},
    created_on: {type: String, required: false},
    updated_on: {type: String, required: false},
    created_by: {type: String, required: false},
    assigned_to: {type: String, required: false},
    open:{type: Boolean, required: true},
    status_text:{type: String, required: false}
});

const issueModel = mongoose.model('issue', issueSchema);

module.exports = function () {
    this.formatDate = function(date = Date.now()) {
        return new Date(date).toDateString()
    };
    this.createIssue = async function(project, data) {
        const issue = new issueModel({
            project: project,
            issue_title: data.issue_title,
            issue_text: data.issue_text,
            created_on: this.formatDate(),
            updated_on: this.formatDate(),
            created_by: data.created_by,
            assigned_to: data.assigned_to,
            open: true,
            status_text: data.status_text
        });
        issue.save();
        return issue;
    };
    this.getAllIssues = async function(project) {
        console.log('in get', project)
        const issues = await issueModel.find({ project: project }).exec()
        return issues
    };
    this.getIssue = async function (_id) {
        console.log('in get one')
        const issue = await issueModel.find({ _id: _id }).exec()
        return issue
    };
    this.deleteIssue = async function (_id) {
        const result = await issueModel.deleteOne({_id: _id})
    }
}


db.once("open", () => {
    console.log("Successfully connected to MongoDB using Mongoose!");
});