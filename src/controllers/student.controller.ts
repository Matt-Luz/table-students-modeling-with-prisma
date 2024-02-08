import { Request, Response } from "express";
import { repository } from "../database/prisma.connection";

export class StudentController {
    // Metodos:

    // index -> listar todos

    public async index(req: Request, res: Response) {
        try {
            //Entrada e processamento:
            const students = await repository.student.findMany()
    
            //Saída:
            return res.status(200).json({
                success: true,
                code: res.statusCode,
                message: "Alunos listados com sucesso!",
                data: students
            })
        } catch (error) {
            //Tratamento de erro:
            return res.status(500).json({
                success: false,
                code: res.statusCode,
                message: "Erro ao listar alunos."
            })
        }
    }

    // store -> cria um novo recurso

    public async store(req: Request, res: Response){
        try {
            //Entrada:
            const { name, email, password, age} = req.body
    
            //Processamento:
            if (!name || !email || !password) {
                return res.status(400).json({
                    success: false,
                    code: res.statusCode,
                    message: "Preencha os campos obrigatórios."
                })
            }
    
            const createdStudent = await repository.student.create({
                data: {
                    name,
                    email,
                    password,
                    age
                }
            })
    
            //Saída:
            return res.status(201).json({
                success: true,
                code: res.statusCode,
                message: "Alunos criado com sucesso!",
                data: createdStudent
            })
        } catch (error) {
            //Tratamento de erro:
            return res.status(500).json({
                success: false,
                code: res.statusCode,
                message: "Erro ao criar aluno."
            })
        }
    }

    // show -> detalhes de um único recurso

    public async show(req: Request, res: Response) {
        // Entrada e processamento:
        try {
            const { id } = req.params

            const student = await repository.student.findUnique({
                where: { id: String(id) }
            })

            if (!student) {
                return res.status(404).json({
                    success: false,
                    code: res.statusCode,
                    message: "Aluno não localizado"
                })
            }

            // Saída:
            return res.status(200).json({
                succes: true,
                code: res.statusCode,
                message: "Aluno localizado com sucesso!",
                data: student
            })
        } catch (error) {
            return res.status(500).json({
                success: false,
                code: res.statusCode,
                message: "Erro ao localizar aluno."
        })
        }
    }

    // update -> atualiza um recurso
    // delete/destroy -> exclui um recurso 

}