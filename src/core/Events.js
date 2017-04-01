import DATA   from './Data';
import {PKMN} from './main';

const EVENTS = {
  'test': ()=>{
    PKMN.start(this);
    PKMN.msgbox("Triggered Events works!");
    PKMN.release();
    PKMN.end();
  },
  'test2': ()=>{
    PKMN.start(this);
    PKMN.msgbox("Example of action Event");
    PKMN.release();
    PKMN.end();
  },
}
export default EVENTS;
