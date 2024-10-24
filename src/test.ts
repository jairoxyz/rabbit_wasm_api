import { main } from './rabbit';

async function run(provider: string, id: string) {

    try {
      const result = await main(provider, id);
      console.log("result from index: ", result);
    } catch (error) {
      console.error("Error:", error);
    }
}

const provider = "rabbit";
const id = "B2dZCD8YKdXK";
run(provider, id);