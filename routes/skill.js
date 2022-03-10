import {
  addUserSkill,
  createSkill,
  getSkills,
  getUsersBySkill,
  getUserSkills,
  removeUserSkill
} from '../controllers/skill.js';
import router from './server.js';

router.get('/v1/skill', getSkills)
router.post('/v1/skill', createSkill)
router.post('/v1/skill/user', addUserSkill)
router.get('/v1/skill/user/all/:id', getUsersBySkill)
router.get('/v1/skill/user/:id', getUserSkills)
router.delete('/v1/skill/user/:id', removeUserSkill)

export default router
