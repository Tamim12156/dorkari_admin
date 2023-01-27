/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	// experimental: {
	// 	forceSwcTransforms: true,
	//   },
	env: {
		apiUrl: process.env.API_URL,
		imageApi: process.env.IMAGE_API,
		imageKey: process.env.IMAGEBB_SECRET_KEY,
	},
};

module.exports = nextConfig;
