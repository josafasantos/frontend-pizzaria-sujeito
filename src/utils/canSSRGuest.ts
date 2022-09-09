import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { parseCookies } from "nookies";


//funcão para paginas que só podem ser acessar por visitantes
export function canSSRGuest<P>(fn:GetServerSideProps<P>){
    return async (ctx:GetServerSidePropsContext):Promise<GetServerSidePropsResult<P>>=>{

        // se o cara tentar acessar a pagina porem tendo ja um login salvo redirecionamos

        const cookies = parseCookies(ctx)

        if(cookies['@nextauth.token']){
            return{
                redirect:{
                    destination: '/dashboard',
                    permanent: false
                }
            }
        }

        return await fn(ctx)
    }
}