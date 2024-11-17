import * as PushAPI from "@pushprotocol/restapi";
import { ENV } from "@pushprotocol/restapi/src/lib/constants";
import { PushAPI as PAPI, CONSTANTS } from '@pushprotocol/restapi';

// Function to opt-in to notifications
export const optInToChannel = async (channelAddress: string, signer: PushAPI.SignerType, walletAddress: string) => {
    try {
        await PushAPI.channels.subscribe({
            signer: signer, // Your web3 signer
            channelAddress: channelAddress,
            userAddress: walletAddress, // User's wallet address
            onSuccess: () => {
                console.log('Opted in to channel');
            },
            onError: (err) => {
                console.error('Error opting into channel', err);
            },
            env: ENV.STAGING // or 'prod' for mainnet
        });
    } catch (err) {
        console.error("Error subscribing to channel:", err);
    }
};

// Function to fetch notifications
export const fetchNotifications = async (walletAddress: string) => {
    try {
        const notifications = await PushAPI.user.getFeeds({
            user: walletAddress!, // User's wallet address
            env: ENV.STAGING, // or 'prod' for mainnet
        });
        return notifications;
    } catch (err) {
        console.error("Error fetching notifications:", err);
    }
};


export const sendPushNotification = async (merchantAddress: string, title: string, body: string, channelAddress: string,  signer: PushAPI.SignerType) => {
    try {

        let scannerUser = await PAPI.initialize(signer, {
            env: CONSTANTS.ENV.STAGING,
        });

        await scannerUser.channel.send(["*"],{
            notification: { title: 'test', body: 'test' },
            channel: "0xd5148b96d3F6F3234721C72EC8a57a4B07A45ca7"
        })
        // await PushAPI.payloads.sendNotification({
        //     signer: signer,
        //     type: 1, // broadcast
        //     identityType: 2, // direct payload
        //     notification: {
        //         title: title,
        //         body: body
        //     },
        //     payload: {
        //         title: title,
        //         body: body,
        //         cta: '',
        //         img: ''
        //     },
        //     channel: "0xd5148b96d3F6F3234721C72EC8a57a4B07A45ca7", // your channel address
        //     env: ENV.STAGING
        // });
    } catch (err) {
        console.error("Error sending notification:", err);
    }
};

