import DATA   from './Data';
import {PKMN} from './main';

const EVENTS = {
  'test': ()=>{
    PKMN.start(this);
    PKMN.msgbox("Events now works!");
    PKMN.release();
    PKMN.end();
  },
  'test2': ()=>{
    PKMN.start(this);
    PKMN.msgbox("Example of action script");
    PKMN.release();
    PKMN.end();
  },
}
export default EVENTS;
