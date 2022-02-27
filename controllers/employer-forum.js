import { errorMsg } from '../helpers/functions.js'

// Add Question for Employer
export const addQuestion = async (req, res) => {
  try {
    //
  } catch (err) {
    console.error(`CREATE USER ERROR: ${err}`)
    res.status(400).json(errorMsg(err))
  }
}

// Get al Questions for Employer
export const getQuestions = async (req, res) => {
  try {
    //
  } catch (err) {
    console.error(`CREATE USER ERROR: ${err}`)
    res.status(400).json(errorMsg(err))
  }
}

// Upvote or downvote question
export const updateQuestionsVote = async (req, res) => {
  try {
    //
  } catch (err) {
    console.error(`CREATE USER ERROR: ${err}`)
    res.status(400).json(errorMsg(err))
  }
}

// Add Answer to Question
export const addAnswer = async (req, res) => {
  try {
    //
  } catch (err) {
    console.error(`CREATE USER ERROR: ${err}`)
    res.status(400).json(errorMsg(err))
  }
}

// Upvote/Downvote answer
export const updateAnswerVote = async (req, res) => {
  try {
    //
  } catch (err) {
    console.error(`CREATE USER ERROR: ${err}`)
    res.status(400).json(errorMsg(err))
  }
}
