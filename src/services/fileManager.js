const fs = require("fs");
const path = require("path");

const FILE_DIRECTORY = path.join(
    __dirname,
    "../../files"
);

// Create files folder automatically
if (!fs.existsSync(FILE_DIRECTORY)) {

    fs.mkdirSync(
        FILE_DIRECTORY,
        { recursive: true }
    );

    console.log(
        "Files directory created successfully."
    );

}

/* =========================
   CREATE FILE
========================= */

function createFile(
    fileName,
    content
) {

    if (!fileName) {

        throw new Error(
            "File name is required"
        );

    }

    const filePath = path.join(
        FILE_DIRECTORY,
        fileName
    );

    fs.writeFileSync(
        filePath,
        content
    );

    console.log(
        `\nFile Created: ${filePath}`
    );

    return {

        success: true,

        message:
            "File created successfully"

    };

}

/* =========================
   READ FILE
========================= */

function readFile(
    fileName
) {

    const filePath = path.join(
        FILE_DIRECTORY,
        fileName
    );

    if (
        !fs.existsSync(filePath)
    ) {

        throw new Error(
            "File not found"
        );

    }

    const content =
        fs.readFileSync(
            filePath,
            "utf8"
        );

    console.log(
        `\nFile Read: ${filePath}`
    );

    console.log(
        "Content:"
    );

    console.log(content);

    return content;

}

/* =========================
   UPDATE FILE
========================= */

function updateFile(
    fileName,
    content
) {

    const filePath = path.join(
        FILE_DIRECTORY,
        fileName
    );

    if (
        !fs.existsSync(filePath)
    ) {

        throw new Error(
            "File not found"
        );

    }

    fs.writeFileSync(
        filePath,
        content
    );

    console.log(
        `\nFile Updated: ${filePath}`
    );

    console.log(
        "Updated Content:"
    );

    console.log(content);

    return {

        success: true,

        message:
            "File updated successfully"

    };

}

/* =========================
   DELETE FILE
========================= */

function deleteFile(
    fileName
) {

    const filePath = path.join(
        FILE_DIRECTORY,
        fileName
    );

    if (
        !fs.existsSync(filePath)
    ) {

        throw new Error(
            "File not found"
        );

    }

    fs.unlinkSync(
        filePath
    );

    console.log(
        `\nFile Deleted: ${filePath}`
    );

    return {

        success: true,

        message:
            "File deleted successfully"

    };

}

/* =========================
   GET ALL FILES
========================= */

function getAllFiles() {

    const files =
        fs.readdirSync(
            FILE_DIRECTORY
        );

    console.log(
        "\nAvailable Files:"
    );

    console.table(files);

    return files;

}

/* =========================
   EXPORTS
========================= */

module.exports = {

    createFile,

    readFile,

    updateFile,

    deleteFile,

    getAllFiles

};