const express     = require('express');
const bodyParser  = require('body-parser');
const expect      = require('chai').expect;
const cors        = require('cors');
require('dotenv').config();
const mongoose = require('mongoose');
const res = require('express/lib/response');
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
    created_on: {type: Date, required: false},
    updated_on: {type: Date, required: false},
    created_by: {type: String, required: true},
    assigned_to: {type: String, required: false, default: ''},
    open:{type: Boolean, required: true},
    status_text:{type: String, required: false, default: ''}
});

const issueModel = mongoose.model('issue', issueSchema);

module.exports = function () {
    this.formatDate = function(date = Date.now()) {
        return new Date(date)// .toDateString()
    };
    this.verifyEntry = function(data) {
        if (!data.issue_title || !data.issue_text || !data.created_by) {
            return false
        } else {
            return true
        }
    };
    this.createIssue = async function(project, data) {
        console.log(project, data)
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
    this.updateIssue = async function (_id, data) {
        const result = await issueModel.updateOne(_id, data);
        console.log(result)
        return result
    }
    this.getAllIssues = async function(filter) {
        const issues = await issueModel.find(filter).exec()
        return issues
    };
    this.getIssue = async function (_id) {
        const issue = await issueModel.find({ _id: _id }).exec()
        return issue
    };
    this.deleteIssue = async function (_id) {
        const result = await issueModel.deleteOne({_id: _id});
        return result;
    }
}


db.once("open", () => {
    console.log("Successfully connected to MongoDB using Mongoose!");
});