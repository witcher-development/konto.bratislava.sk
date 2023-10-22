import {useEffect, useState} from "react";
import axios from 'axios'
import MunicipalServicesSection from 'components/forms/segments/AccountSections/MunicipalServicesSection/MunicipalServicesSection'
import AccountPageLayout from 'components/layouts/AccountPageLayout'
import PageWrapper from 'components/layouts/PageWrapper'
import {
  getSSRCurrentAuth,
  ServerSideAuthProviderHOC,
} from 'components/logic/ServerSideAuthProvider'
import { GetServerSidePropsContext } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { AsyncServerProps } from '../frontend/utils/types'
import MunicipalServicesSectionHeader
    from "../components/forms/segments/AccountSectionHeader/MunicipalServicesSectionHeader";
import Alert from "../components/forms/info-components/Alert";
import ServiceCard, {ServiceCardBase} from "../components/forms/simple-components/ServiceCard";
import Pagination from "../components/forms/simple-components/Pagination/Pagination";
import {ChevronRightIcon} from "@assets/ui-icons";
import { v4 as uuid } from 'uuid'

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
    const locale = ctx.locale ?? 'sk'

    return {
        props: {
            ssrCurrentAuthProps: await getSSRCurrentAuth(ctx.req),
            page: {
                locale: ctx.locale,
                localizations: ['sk', 'en']
                    .filter((l) => l !== ctx.locale)
                    .map((l) => ({
                        slug: '',
                        locale: l,
                    })),
            },
            ...(await serverSideTranslations(locale)),
        },
    }
}

type Task = {
    id: string,
    name: string
    description: string
    score: number
}

type Goal = {
    id: string,
    name: string
    progress: number
    tasks: Task[]
}



const createTask = (name: string, description: string, score: number): Task => ({
    id: uuid(), name, description, score
})

const createGoal = (name: string, progress: number, tasks: Task[]): Goal => ({
    id: uuid(), name, progress, tasks
})

const goals: Goal[] = [
    createGoal('Waste reduction', 45, [
        createTask('Take a Quiz', 'Very important quiz', 5)
    ])
]

const profile = {
    name: '',
    rank: '',
    score: 300
}

// export const client = axios.create({
//     baseURL: 'http://localhost:3001'
// })


const CityHeroPage = ({ page }: AsyncServerProps<typeof getServerSideProps>) => {
    // const [goals, setGoals] = useState<Goal[]>([])
    //
    // useEffect(() => {
    //     const fetch = async () => {
    //         const response = await client.get('/goal')
    //
    //         setGoals(response.data)
    //     }
    // }, [])

  return (
  <PageWrapper locale={page.locale} localizations={page.localizations}>
      <AccountPageLayout>
          <div className="flex flex-col">
              <div className="mx-auto w-full max-w-screen-lg pt-4 lg:pt-8">
                  <Alert
                      message="Hero WANTED!"
                      type="info"
                      fullWidth
                      className="mx-4 mb-4 lg:mx-0 lg:mb-8"
                  />
                  <div className="grid grid-cols-1 gap-3 px-4 sm:gap-6 min-[615px]:grid-cols-2 md:gap-8 min-[960px]:grid-cols-3 lg:grid-cols-4 lg:px-0">
                      {goals
                          .map(({ name, progress, tasks}, i) => (
                              <></>
                              // <ServiceCard
                              //     key={i}
                              //     // className={card.className}
                              //     title={card.title}
                              //     description={card.description}
                              //     // buttonText={card.buttonText}
                              //     // linkType={card.linkType}
                              //     icon={card.icon}
                              //     // href={card.href}
                              //     // tag={card.tag}
                              //     // tagStyle={card.tagStyle}
                              //     // onPress={card.onPress}
                              //     // plausibleProps={{ id: `Mestské služby: ${card.title}` }}
                              // />
                          ))}
                  </div>
              </div>
          </div>
      </AccountPageLayout>
    </PageWrapper>
  )
}

export default ServerSideAuthProviderHOC(CityHeroPage)
