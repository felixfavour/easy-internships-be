export const USER_TYPE = {
  EMPLOYER: 'employer',
  SCHOOL: 'school',
  STUDENT: 'student'
}

export const INTERVIEW_DIFFICULTY = {
  EMPLOYER: 'difficult',
  SCHOOL: 'medium',
  STUDENT: 'easy'
}

export const VOTE = {
  UP: 'upvote',
  DOWN: 'downvote',
  DEFAULT: 'default'
}

export const ACTIVITY = {
  INTEREST: 'interest',
  SKILL: 'skill',
  VISIT: 'visit',
}

export const UNPROTECTED_ROUTES = [
  '/',
  '/v1',
  '/v1/auth/signup',
  '/v1/auth/login',
  '/v1/file',
  '/v1/user/username'
]
