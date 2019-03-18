const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userAnswerSchema = new Schema({
    userID: { type: String, required: true },
    userName: { type: String, required: true },
    departmentID: { type: String, required: true },
    departmentName: { type: String, required: true },
    isHelpful: { type: String, required: true },
    opinion: { type: String, required: false },
    answer: { type: Array, required: true }
});

const UserAnswer = mongoose.model('userAnswer', userAnswerSchema);

async function submit(userInfo, isHelpful, opinion, answer) {
    if (userInfo.departmentID != 'ADMIN') {
        try {
            var newUserAnswer = new UserAnswer({
                userID: userInfo.userID,
                userName: userInfo.userName,
                departmentID: userInfo.departmentID,
                departmentName: userInfo.departmentName,
                isHelpful: isHelpful,
                opinion: opinion,
                answer: answer
            });
            return await newUserAnswer.save();
        } catch(err) {
            console.error(err);
        }
    }
}

module.exports = {submit}