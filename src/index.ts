import {createServer} from "./utils/serverUtil";

const PORT = process.env.PORT || 3022;
const app = createServer();
app.listen(PORT, async () => {
    console.log(`App is running at http://localhost:${PORT}`);
});
