export class ApiMethods {
  static async GetParams<ResType>(
    endpoint:string,
    query:string,
    params:string
  ):Promise<ResType>{
    try {
        const api_url=`http://localhost:3333${endpoint}${query}=${this.extractParams(params)}`
        console.log("Final URL",api_url);
        const res = await fetch(api_url, {
            method:"GET",
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                'Accept-Encoding': 'gzip',
                Connection: 'keep-alive',
              },
        })
        return res.json()
    } catch (e) {
        throw e
    }
  }

  static async GetById<ResType>(
    endpoint:string,
    id:number
  ):Promise<ResType>{
    try {
        const api_url=`http://localhost:3333${endpoint}/${id}`
        console.log("Final URL",api_url);
        const res = await fetch(api_url, {
            method:"GET",
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                'Accept-Encoding': 'gzip',
                Connection: 'keep-alive',
              },
        })
        return res.json()
    } catch (e) {
        throw e
    }
  }

  static async Get(
    endpoint:string
  ){
    try {
        const api_url = `http://localhost:3333${endpoint}`;
        console.log("Final URL",api_url);
        const res = await fetch(api_url, {
            method:"GET",
            headers: {
                "Content-Type":"application/json",
                Accept:"application/json",
                "Accept-Encoding":"gzip",
                Connection:"keep-alive"
            },
        })
        return res.json()
    } catch (e) {
        throw e
    }
  }

  static async GetCourses(
    endpoint:string
  ) {
    try {
        const api_url = `http://localhost:3333${endpoint}`;
        console.log("Final URL", api_url);
        const res = await fetch(api_url, {
            method:"GET",
            headers: {
                "Content-Type":"application/json",
                Accept:"application/json",
                "Accept-Encoding":"gzip",
                Connection:"keep-alive"
            },
        })
        return res.json()
    } catch (e) {
        throw e
    }
  }

  static async GetStudentsByFilters(
    endpoint:string,
    filters:{[key:string]:string}
  ){
    try {
        const part= `course=${filters.course? filters.course: ""}&status=${filters.status? filters.status :""}&nationality=${filters.nationality?filters.nationality:""}&sortName=${filters.sortName? filters.sortName:""}`
        const api_url=`http://localhost:3333${endpoint}${part}`
        console.log(api_url);
        const res=await fetch(api_url, {
          method:"GET",
          headers: {
            "Content-Type":"application/json",
            Accept:"application/json",
            "Accept-Encoding":"gzip",
            Connection:"keep-alive"
          }
        })
        return res.json()
    } catch (e) {
        throw e
    }
  }

  static async Post<ReqType, ResType>(
    endpoint: string,
    body: ReqType,
  ): Promise<ResType> {
    try {
      const api_url = `http://localhost:3333${endpoint}`
      console.log(api_url);
      const res = await fetch(api_url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'Access-Control-Allow-Origin':'http://localhost:3000',
          "Access-Control-Allow-Credentials" : 'true' ,
          'Accept-Encoding': 'gzip',
          Connection: 'keep-alive',
        },
        body: JSON.stringify(body),
      })
      return res.json()
    } catch (e) {
      throw e
    }
  }

  static async Patch<ReqType, ResType>(
    endpoint: string,
    idnumber:number,
    body: ReqType,
  ): Promise<ResType> {
    try {
      const api_url = `http://localhost:3333${endpoint}/${idnumber}`
      console.log(api_url);
      const res = await fetch(api_url, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'Access-Control-Allow-Origin':'http://localhost:3000',
          "Access-Control-Allow-Credentials" : 'true' ,
          'Accept-Encoding': 'gzip',
          Connection: 'keep-alive',
        },
        body: JSON.stringify(body),
      })
      return res.json()
    } catch (e) {
      throw e
    }
  }

  static async Delete<ResType>(
		endpoint: string,
    idnumber:number
	): Promise<ResType> {
		try {
			/*const api_url = `${
				process.env.API_URL
			}${endpoint}${this.extractParams<ParamsType>(params)}`;*/
      const api_url = `http://localhost:3333${endpoint}/${idnumber}`
			const res = await fetch(api_url, {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json",
					"Accept-Encoding": "gzip",
				},
			});
			return res.json();
		} catch (e) {
			throw e;
		}
	}




  




  static extractParams<ParamsType>(params: ParamsType) {
    if (typeof params === "number"){
        return params.toString()
    } else {
        return params
    }
  }




}
