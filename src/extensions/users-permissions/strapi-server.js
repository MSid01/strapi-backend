module.exports = (plugin) => {
    // controller and route for tokenDecrypt
    plugin.controllers.auth['refreshToken'] = async (ctx) => {
      // get token from the POST request
      const {token} = ctx.request.body;
  
      // check token requirement
      if (!token) {
        return ctx.badRequest('`token` param is missing')
      }
  
      try {
        // decrypt the jwt
        const obj = await strapi.service("plugin::users-permissions.jwt").verify(token);
        console.log(obj, Date.now()/1000);
        // send the decrypted object
        if(Date.now() / 1000 > obj.exp)
        return "invalid";
        else 
        return "valid";
      } catch (err) {
        // if the token is not a valid token it will throw and error
        return ctx.badRequest(err.toString());
      }
    };
    plugin.routes['content-api'].routes.push({
        "method": "POST",
        "path": "/auth/refreshToken",
        "handler": "auth.refreshToken",
        "config": {
          "policies": [],
          "prefix": "",
      },
    });
    return plugin;
};