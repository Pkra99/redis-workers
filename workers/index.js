import { createClient } from "redis";

const client = createClient()
async function main(){
    try {
        client.connect()
        while(true) {
            const response = await client.brPop('submit', 0)
            console.log(response)
            await new Promise((resolve) =>  setTimeout(resolve, 1000))
        }
    } catch (error) {
        console.log(error || "Something went wrong in worker")
    }   
}
main()