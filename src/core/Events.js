import DATA   from './Data';
import {PKMN} from './main';

const EVENTS = {
  'test': ()=>{
    PKMN.start(this);
    PKMN.msgbox("You can run holding press the Z key");
    PKMN.release();
    PKMN.end();
  },
  'test2': ()=>{
    PKMN.start(this);
    PKMN.msgbox("Example of action Event");
    PKMN.release();
    PKMN.end();
  },
  'npctest': ()=>{
    PKMN.start(this);
    PKMN.look("0", "left");
    PKMN.look("0", "right");
    PKMN.look("0", "up");
    PKMN.look("0", "down");
    PKMN.faceplayer("0");
    PKMN.msgbox("No one is looking!");
    PKMN.release();
    PKMN.end();
  },
  'playerhouse':()=>{
    PKMN.start(this);
    PKMN.msgbox("[PLAYER]'s house");
    PKMN.release();
    PKMN.end();
  },
}
export default EVENTS;
