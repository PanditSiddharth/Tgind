

// let axios = require('axios');
// const EventEmitter = require('events');
// import FormData from 'form-data'
let FormData = require('form-data') as any

let fs = require('fs')


// Document Extensions
// const document = ['pdf', 'doc', 'docx', 'ppt', 'pptx', 'xls', 'xlsx', 'txt', '.js', '.py'];
const document = ['pdf', 'docx', 'xlsx', 'pptx', 'doc', 'ppt', 'xls', 'txt', 
'csv', 'rtf', 'html', 'xml', 'json', 'yaml', 'css', 'md', 'sql', 'js',
 'py', 'java', 'c', 'cpp', 'h', 'rb', 'php', 'pl', 'sh', 'ts', 'replit', 'nix', 'bash'];


// Audio Extensions
const audio = ['mp3', 'wav', 'ogg', 'flac', 'aac', 'flac'];

// Video Extensions
const video = [ 'mp4', 'mov', 'avi', 'mkv', 'wmv', 'flv',];

// Image Extensions
const photo = ['jpg', 'jpeg', 'png','gif', 'bmp', 'svg'];

let category = [document, audio, video, photo]
let ct = ["document", "audio", "video", "photo"]

export let fromLocal = (file: any, filename?:any) => {
        let formData = new FormData();
        let fext = file.match(/\.([a-zA-Z0-9]+)$/)
        let ftype;

        for (let i = 0; i < category.length; i++) {
            const cat = category[i] as any;
            for (let j = 0; j < cat.length; j++) {
                if ("." + cat[j] == fext[0]){
                    ftype = ct[i]
                    break;
                }
            }
        }

        if (filename) {
            formData.append(ftype, fs.createReadStream(file), {filename});
        } else {
            formData.append(ftype, fs.createReadStream(file));
        }
          
        return formData;
    }


const _messageTypes = [
    'text',
    'animation',
    'audio',
    'channel_chat_created',
    'contact',
    'delete_chat_photo',
    'dice',
    'document',
    'game',
    'group_chat_created',
    'invoice',
    'left_chat_member',
    'location',
    'migrate_from_chat_id',
    'migrate_to_chat_id',
    'new_chat_members',
    'new_chat_photo',
    'new_chat_title',
    'passport_data',
    'photo',
    'pinned_message',
    'poll',
    'sticker',
    'successful_payment',
    'supergroup_chat_created',
    'video',
    'video_note',
    'voice',
    'video_chat_started',
    'video_chat_ended',
    'video_chat_participants_invited',
    'video_chat_scheduled',
    'message_auto_delete_timer_changed',
    'chat_invite_link',
    'chat_member_updated',
    'web_app_data',
  ];