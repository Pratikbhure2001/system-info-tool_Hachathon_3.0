function getEnvironmentVariables(){

    return {

        username:
        process.env.USERNAME ||
        process.env.USER ||
        "Not Available",

        nodeEnv:
        process.env.NODE_ENV ||
        "Not Available",

        temp:
        process.env.TEMP ||
        "Not Available",

       path:
  process.env.PATH
    ? [...new Set(
        process.env.PATH
          .split(";")
          .filter(path => path.trim())
      )]
    : []
    };
}

module.exports =
getEnvironmentVariables;
