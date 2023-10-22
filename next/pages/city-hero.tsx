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

export type Task = {
    id: string,
    name: string
    description: string
    score: number
    goalId?: number
}

export type Goal = {
    id: number,
    name: string
    cityProgress: number
    communityProgress: number
}



const createTask = (name: string, description: string, score: number, goalId?: number): Task => ({
    id: uuid(), name, description, score, goalId
})

const createGoal = (id: number, name: string, cityProgress: number, communityProgress: number): Goal => ({
    id, name, cityProgress, communityProgress
})

export const goals: Goal[] = [
    createGoal(1, 'Waste reduction', 60, 30)
]

const tasks: Task[] = [
    createTask('Take a Quiz', 'Very important quiz', 5),
    createTask('Fill Out a Survey: What is your waste production level?', '', 10, 1),
    createTask('Upcycle at KOLO', '', 20, 1),
]

const profile = {
    name: 'Climadude',
    rank: 2,
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

              </div>
          </div>
      </AccountPageLayout>
    </PageWrapper>
  )
}

export default ServerSideAuthProviderHOC(CityHeroPage)
