//ec2-user environment for serving nextjs
module.exports = {
  apps: [
    {
      name: "sanjivani-frontend",
      script: "npm",
      args: "start",
      cwd: "/home/ec2-user/apps/Iskcon_Sanjivani2",
      watch: true,
      env: {
        NODE_ENV: "production",
      },
    },
  ],
};
