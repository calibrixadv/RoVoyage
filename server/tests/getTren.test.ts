import supertest from "supertest"
import formatDate from "../api/fromatDate"



const start_city_name="Bucuresti"
const end_city_name="Brasov"
const str=`${start_city_name}, ${end_city_name}`
const request=supertest("http://localhost:5555")
test("GET TRAIN",async()=>{
    const res=await request.post("/quizz-response")
    .set('Content-type', 'application/json')
    .send(
            JSON.stringify({
            vehicle:"train",
        tags:[""],
        city_number:0,
        cities:["","Bucuresti Nord"],
        max_time: 100,
        departure_date:formatDate(new Date())
        })
    ).expect(200)
})
/*


describe("Train data",()=>{
    test(`fails train data for ${str}`, async()=>{
        try{
        await getTren(start_city_name,end_city_name)
        }
        catch(e){
            expect(e).toMatch('error')
        }
    })
    test(`get train data for ${str}`, async()=>{
        await expect(getTren(start_city_name,end_city_name)).resolves.toBeInstanceOf(Object)
    })
})
*/