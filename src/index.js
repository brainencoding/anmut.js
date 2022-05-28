import './util/polyfill';
import AnmutCore from "./core/AnmutCore";

const Anmut = AnmutCore;

window.Anmut = Anmut;
export default Anmut;

if (process.env.NODE_ENV === 'development') {
    import('../example');
}