
export interface FunctionalitySubSection {
    title: string
    description: string
    components: PostComponent
}

export type FunctionalitySubSectionArray = FunctionalitySubSection[]

export const PostsComponents = {
    post: "post",
    user: "user",
    stepViewer: "step-viewer"
} as const;

export type PostComponent = typeof PostsComponents[keyof typeof PostsComponents]


export const functionalitySubSections: FunctionalitySubSectionArray = [
    {
        title: "Share your recipes",
        description: "Share them please <3",
        components: PostsComponents.post,
    },
    {
        title: "Meet food lovers",
        description: "Find new friends :D",
        components: PostsComponents.user,
    },
    {
        title: "Learn and teach",
        description:
            "With our step viewer you can show how to prepare a recipe",
        components: PostsComponents.stepViewer,
    },
];