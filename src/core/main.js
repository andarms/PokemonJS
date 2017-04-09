import Game from './Game';
import Pkmn from './Pkmn';

let g = new Game();
export const PKMN = new Pkmn(g);
export const GFX = {};


///Electron Config

if(window.NodeRequire){
  const {remote} = window.NodeRequire('electron');
  const {Menu, MenuItem} = remote;
  const win = remote.getCurrentWindow();
  let template = [
    {
      label: "Options",
      submenu: [
        {
          label: "Video",
          submenu:[
            {
              label: "x1", 
              type: 'radio',
              checked: true,
              click: ()=>{
                win.setSize(512, 432);
                win.setFullScreen(false);
              }
            },
            {
              label: "x1.5", 
              type: 'radio',
              click: ()=>{
                win.setSize(768, 624);
                win.setFullScreen(false);
              }
            },
            {
              label: "x2", 
              type: 'radio',
              click: ()=>{
                win.setSize(1024, 816);
                win.setFullScreen(false);
              }              
            },
            {
              label: "Fullscreen", 
              type: 'radio',
              click: ()=>{
                win.setFullScreen(true);
              }
            }
          ]
        }
      ]
    }
  ];
  var menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}

