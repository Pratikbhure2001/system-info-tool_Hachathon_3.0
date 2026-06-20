const fileManager =
    require("./services/fileManager");
const express = require("express");
const path = require("path");

const getSystemInfo = require("./services/systemInfo");
const getEnvironmentVariables = require("./services/envInfo");

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, "../public")));

app.get("/api/system-info", (req, res) => {

    try {

        const systemInfo =
            getSystemInfo();

        const environmentVariables =
            getEnvironmentVariables();

        // Console Output
        console.log("\n================================");
        console.log("SYSTEM INFORMATION");
        console.log("================================");

        console.log(
            JSON.stringify(
                systemInfo,
                null,
                2
            )
        );

        console.log("\n================================");
        console.log("ENVIRONMENT VARIABLES");
        console.log("================================");

        console.log(
            JSON.stringify(
                environmentVariables,
                null,
                2
            )
        );

        res.json({
            systemInfo,
            environmentVariables,
            generatedAt:
                new Date().toISOString()
        });

    }
    catch (error) {

        console.error(
            "Error:",
            error.message
        );

        res.status(500).json({
            error: error.message
        });

    }

});

//CRUD Operations for Files

app.get(
    "/api/files",
    (req, res) => {

        try {

            const files =
                fileManager
                    .getAllFiles();

            res.json(files);

        }
        catch(error){

            res.status(500)
                .json({
                    error:
                    error.message
                });

        }

    }
);


app.get(
    "/api/files/:name",
    (req,res)=>{

        try{

            const content =
                fileManager.readFile(
                    req.params.name
                );

            res.json({
                content
            });

        }
        catch(error){

            res.status(404)
                .json({
                    error:
                    error.message
                });

        }

    }
);

app.post(
    "/api/files",
    (req,res)=>{

        try{

            const {
                fileName,
                content
            } = req.body;

            const result =
                fileManager
                .createFile(
                    fileName,
                    content
                );

            res.json(result);

        }
        catch(error){

            res.status(500)
                .json({
                    error:
                    error.message
                });

        }

    }
);

app.put(
    "/api/files/:name",
    (req,res)=>{

        try{

            const result =
                fileManager
                .updateFile(

                    req.params.name,

                    req.body.content

                );

            res.json(result);

        }
        catch(error){

            res.status(500)
                .json({
                    error:
                    error.message
                });

        }

    }
);

app.delete(
    "/api/files/:name",
    (req,res)=>{

        try{

            const result =
                fileManager
                .deleteFile(
                    req.params.name
                );

            res.json(result);

        }
        catch(error){

            res.status(500)
                .json({
                    error:
                    error.message
                });

        }

    }
);

const PORT = 3000;

app.listen(PORT, () => {

    console.log("\n================================");
    console.log("SERVER STARTED");
    console.log("================================");
    console.log(
        `Dashboard: http://localhost:${PORT}`
    );

});