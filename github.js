//.env 파일에서 환경 변수 로드
const dotenv = require('dotenv');
dotenv.config(); 

//Github API에 필요한 데이터 가져오기 
class Github {
  constructor() {
    this.client_id = process.env.GITHUB_CLIENT_ID;
    this.client_secret = process.env.GITHUB_CLIENT_SECRET;
    this.token = process.env.GITHUB_TOKEN;
    this.repos_count = 5;
    this.repos_sort = 'created: asc';  
  }

  //유저에 대한 정보 기다리기
  async getUser(user) {
    const profileResponse = 
      await fetch(
        `https://api.github.com/users/${user}?client_id=${this.client_id}&client_secret=${this.client_secret}`,
        {
          //토큰으로 rate 제한 풀기
          headers: {
            Authorization: `Bearer ${this.token}`
          }
        }
      );

    const repoResponse = 
      await fetch(
        `https://api.github.com/users/${user}/repos?per_page=${this.repos_count}&sort=${this.repos_sort}&client_id=${this.client_id}&client_secret=${this.client_secret}`
      );

    const profile = await profileResponse.json();
    const repos = await repoResponse.json();
    
    return {
      profile,
      repos
    }
  }
}