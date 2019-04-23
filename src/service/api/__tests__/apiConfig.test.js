import axios from 'axios';
import { setIdToken } from '../apiConfig';

describe('the apiConfig', () => {
    describe('idToken setter', () => {
        it('should be defined', () => {
            expect(setIdToken).toBeDefined();
        });

        it('should set a default header on axios', () => {
            setIdToken('asdf');
            expect(axios.defaults.headers.common['idToken']).toBe('asdf');
        });
    });

    it('should set the base URL to a default URL', () => {
        expect(axios.defaults.baseURL).toBe('http://localhost:3001/api');
    });

    it('should set the content-type header for POST and PUT requests', () => {
        expect(axios.defaults.headers.post['Content-Type']).toBe('application/json');
        expect(axios.defaults.headers.put['Content-Type']).toBe('application/json');
    });
});