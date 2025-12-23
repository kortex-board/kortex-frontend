export interface User {
    id: string
    name: string
    email: string
}

export interface Task {
    id: string
    title: string
}

export interface List {
    id: string
    title: string
    tasks: Task[]
}

export interface Board {
    id: string
    title: string
    lists: List[]
}

export interface LoginDto {
    email: string
    password?: string
}

export interface RegisterDto extends LoginDto {
    name: string
}
