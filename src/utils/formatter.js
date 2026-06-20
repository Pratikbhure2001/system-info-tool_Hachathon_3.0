function printSection(title, data) {
    console.log("\n================================");
    console.log(title);
    console.log("================================");

    console.log(
        JSON.stringify(data, null, 2)
    );
}

module.exports = printSection;