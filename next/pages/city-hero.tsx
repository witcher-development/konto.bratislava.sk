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
import {useRouter} from "next/router";
import ProgressBar from "../components/forms/simple-components/ProgressBar";
import cx from "classnames";
import SuccessIcon from "../components/forms/icon-components/SuccessIcon";

function customSort(a, b) {
    // Sort items with 'field' set to false to the end
    if (a.finished === false && b.finished === true) {
        return -1; // 'a' comes after 'b'
    } else if (a.finished === true && b.finished === false) {
        return 1; // 'a' comes before 'b'
    } else {
        return 0; // No change in order
    }
}


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
    finished: boolean
}

export type Goal = {
    id: number,
    name: string
    cityProgress: number
    cityProgressLabel: string
    communityProgress: number
    communityProgressLabel: string
}



const createTask = (name: string, description: string, score: number, finished: boolean, goalId?: number): Task => ({
    id: uuid(), name, description, score, goalId, finished
})

const createGoal = (
    id: number,
    name: string,
    cityProgress: number,
    cityProgressLabel: string,
    communityProgress: number,
    communityProgressLabel: string
): Goal => ({
    id, name, cityProgress, communityProgress, cityProgressLabel, communityProgressLabel
})

export const goals: Goal[] = [
    createGoal(1, 'Waste reduction', 60, "60K KG", 30, "2490 activity points"),
    createGoal(1, 'Cleaner Air', 34, "+34 AQP", 24, "513 activity points")
]

const tasks: Task[] = [
    createTask('Take a Quiz', 'Very important quiz', 5, true),
    createTask('Survey: What is your waste production level?', '', 10, false, 1),
    createTask('Upcycle at KOLO', '', 20, false, 1),
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
    const router = useRouter()
    const goalId = router.query.id as string

    const goal = goalId ? goals.filter(({ id }) => id === Number(goalId))[0] : null


    // const [goals, setGoals] = useState<Goal[]>([])
    //
    // useEffect(() => {
    //     const fetch = async () => {
    //         const response = await client.get('/goal')
    //
    //         setGoals(response.data)
    //     }
    // }, [])

    const filteredTasks = goalId ? tasks.filter(({ goalId: gi }) => {
        if (!gi) return true
        return Number(goalId) === gi
    }) : tasks

  return (
  <PageWrapper locale={page.locale} localizations={page.localizations}>
      <AccountPageLayout>
          <div className="flex flex-col">
              <div className="mx-auto w-full max-w-screen-lg p-4 lg:pt-8">

                  {goal && (
                      <div className="flex flex-col gap-5 w-full">
                          <h1 className="text-h1">
                              {goal.name}
                          </h1>
                          <div className="flex">
                              <div className="flex flex-col items-center gap-2" style={{ width: '50%' }}>
                                  <ProgressBar value={goal.cityProgress} type="city" label="100kg" />
                                  <p className="mr-2">
                                      {goal.cityProgressLabel}
                                  </p>
                              </div>
                              <div className="bg-gray-200 h-6 w-0.5"></div>
                              <div className="flex flex-col items-center gap-2" style={{ width: '50%' }}>
                                  <ProgressBar value={goal.communityProgress} type="success" label="500 points" mirrored={true} />
                                  <p className="ml-2">
                                      {goal.communityProgressLabel}
                                  </p>
                              </div>
                          </div>

                          <p>
                              <span>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias consequuntur, fuga. Consectetur consequatur doloremque, ducimus eos expedita explicabo impedit inventore iure necessitatibus non optio quis quo sit vel voluptas voluptates.</span>
                          </p>
                      </div>
                  )}

                  <h3 className="text-h2 mt-12 mb-5">
                      Activities
                  </h3>

                  <div className="flex flex-col gap-2">
                      {filteredTasks.sort(customSort).map(({ name, score, finished }) => (
                          <div className={cx("flex flex-col gap-5 w-full p-4 rounded-xl pr-8 relative", {
                              'border-success-600': finished,
                              'border-gray': !finished
                          })} style={{ borderWidth: finished ? 1 : 2 }}>
                              <h4 className={cx('text-h4', {
                                  'line-through': finished,
                                  'text-success-600': finished,
                                  'font-normal': finished,
                              })}>{name}</h4>

                              <div className="absolute" style={{ top: '17px', right: '16px'}}>
                              {finished ? (
                                  <SuccessIcon />
                              ) : score}
                              </div>
                          </div>
                      ))}
                  </div>

              </div>
          </div>
      </AccountPageLayout>
    </PageWrapper>
  )
}

export default ServerSideAuthProviderHOC(CityHeroPage)
