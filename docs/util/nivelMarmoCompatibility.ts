import ma, { maMerge } from '@marmo/react'

// nivel 0.3 still imports the pre-Marmo merge export internally.
export { maMerge as cmMerge }
export default ma
