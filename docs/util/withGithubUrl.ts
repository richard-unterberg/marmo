import docs from '../pages/+docs'

export const hasGitUrl = !!docs.social?.github

export const withGithubUrl = (repoLink: string) => {
  if (repoLink) {
    return `${docs.social.github}/tree/${docs.social.editLinkBranch ?? 'main'}/${repoLink}`
  }
  return docs.social.github
}
