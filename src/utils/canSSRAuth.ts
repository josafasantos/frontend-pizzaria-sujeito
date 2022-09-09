import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { parseCookies, destroyCookie } from "nookies";
import { AuthTokenError } from "../service/erros/AuthTokenError";

//funcao para paginas que só users logados podem ter acesso

export function canSSRAtuh<P>(fn: GetServerSideProps<P>){
    return async (ctx: GetServerSidePropsContext):Promise<GetServerSidePropsResult<P>> => {
        const cookies = parseCookies(ctx);

        const token = cookies['@nextauth.token']

        if (!token) {
            return{
                redirect:{
                    destination:'/',
                    permanent: false
                }
            }
        }

        try{
            return await fn(ctx)
        }catch(err){
            if (err instanceof AuthTokenError) {
                destroyCookie(ctx, '@nextauth.token');

                return{
                    redirect:{
                        destination: '/',
                        permanent: false
                    }
                }
            }
        }
        
    }
}
