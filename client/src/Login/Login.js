import { Container } from 'react-bootstrap'

const client_id = '3da6dc947ad845449ce3be18572218b8';
const response_type = 'code';
const redirect_uri = 'http://localhost:3000';
const scope =
  'streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-private%20user-read-playback-state%20user-modify-playback-state%20user-read-recently-played';

const authUrl = `https:/accounts.spotify.com/authorize?client_id=${client_id}&response_type=${response_type}&redirect_uri=${redirect_uri}&scope=${scope}`;

function Login () {
    return (
    <div className='screen-blocker'>
        <Container className='d-flex justify-content-center align-items-center' style={{minHeight: "100vh"}}>
        <a className='btn btn-success btn-lg' href={authUrl}>
            Login with Spotify
        </a>
        </Container>
    </div>
    );
}

export default Login;