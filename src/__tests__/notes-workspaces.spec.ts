import request from 'supertest';
import path from 'path';
import { Connection, getRepository, getConnection } from 'typeorm';
import createConnection from '../database';

import app from '../app';
import Note from '../models/Note';
import Workspace from '../models/Workspace';

let connection: Connection;

describe('Worksapce', () => {
    beforeAll(async () => {
        connection = await createConnection('test-connection');

        await connection.query('DROP TABLE IF EXISTS workspaces');
        await connection.query('DROP TABLE IF EXISTS notes');
        await connection.query('DROP TABLE IF EXISTS migrations');

        await connection.runMigrations();
    });

    beforeEach(async () => {
        await connection.query('DELETE FROM workspaces');
        await connection.query('DELETE FROM notes');
    });

    afterAll(async () => {
        const mainConnection = getConnection();

        await connection.close();
        await mainConnection.close();
    });

    it('should be able to list workspaces', async () => {
        await request(app).post('/workspaces').send({
            /* title: 'March Salary',
            type: 'income',
            value: 4000,
            category: 'Salary', */
        });

        await request(app).post('/workspaces').send({
            /* title: 'April Salary',
            type: 'income',
            value: 4000,
            category: 'Salary', */
        });

        await request(app).post('/workspaces').send({
            /*  title: 'Macbook',
            type: 'outcome',
            value: 6000,
            category: 'Eletronics', */
        });

        const response = await request(app).get('/workspaces');

        expect(response.body.workspaces).toHaveLength(3);
        expect(response.body.balance).toMatchObject({
            /* income: 8000,
            outcome: 6000,
            total: 2000, */
        });
    });

    it('should be able to create new worspace', async () => {
        const workspacesRepository = getRepository(Workspace);

        const response = await request(app).post('/workspaces').send({
            /* title: 'March Salary',
            type: 'income',
            value: 4000,
            category: 'Salary', */
        });

        const worspace = await workspacesRepository.findOne({
            where: {
                /* title: 'March Salary', */
            },
        });

        expect(worspace).toBeTruthy();

        expect(response.body).toMatchObject(
            expect.objectContaining({
                id: expect.any(String),
            }),
        );
    });

    it('should create tags when inserting new workspaces', async () => {
        const workspacesRepository = getRepository(Workspace);
        const notesRepository = getRepository(Note);

        const response = await request(app).post('/workspaces').send({
            /*  title: 'March Salary',
            type: 'income',
            value: 4000,
            category: 'Salary', */
        });

        const category = await notesRepository.findOne({
            where: {
                /* title: 'Salary', */
            },
        });

        expect(category).toBeTruthy();

        const worspace = await workspacesRepository.findOne({
            where: {
                /*  title: 'March Salary',
                category_id: category?.id, */
            },
        });

        expect(worspace).toBeTruthy();

        expect(response.body).toMatchObject(
            expect.objectContaining({
                id: expect.any(String),
            }),
        );
    });

    it('should not create tags when they already exists', async () => {
        const workspacesRepository = getRepository(Workspace);
        const notesRepository = getRepository(Note);

        /*  const { identifiers } = await notesRepository.insert({
            title: 'Salary',
        }); */

        /* const insertedNoteId = identifiers[0].id; */

        await request(app).post('/workspaces').send({
            /* title: 'March Salary',
            type: 'income',
            value: 4000,
            category: 'Salary', */
        });

        const worspace = await workspacesRepository.findOne({
            where: {
                title: 'March Salary',
                /* category_id: insertedNoteId, */
            },
        });

        const notesCount = await notesRepository.find();

        expect(notesCount).toHaveLength(1);
        expect(worspace).toBeTruthy();
    });

    it('should not be able to create outcome worspace without a valid balance', async () => {
        await request(app).post('/workspaces').send({
            /* title: 'March Salary',
            type: 'income',
            value: 4000,
            category: 'Salary', */
        });

        const response = await request(app).post('/workspaces').send({
            /* title: 'iPhone',
            type: 'outcome',
            value: 4500,
            category: 'Eletronics', */
        });

        expect(response.status).toBe(400);
        expect(response.body).toMatchObject(
            expect.objectContaining({
                status: 'error',
                message: expect.any(String),
            }),
        );
    });

    it('should be able to delete a worspace', async () => {
        const workspacesRepository = getRepository(Workspace);

        const response = await request(app).post('/workspaces').send({
            /* title: 'March Salary',
            type: 'income',
            value: 4000,
            category: 'Salary', */
        });

        await request(app).delete(`/workspaces/${response.body.id}`);

        const worspace = await workspacesRepository.findOne(response.body.id);

        expect(worspace).toBeFalsy();
    });

    it('should be able to import workspaces', async () => {
        const workspacesRepository = getRepository(Workspace);
        const notesRepository = getRepository(Note);

        const importCSV = path.resolve(__dirname, 'import_template.csv');

        await request(app).post('/workspaces/import').attach('file', importCSV);

        const workspaces = await workspacesRepository.find();
        const notes = await notesRepository.find();

        expect(notes).toHaveLength(2);
        expect(notes).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    title: 'Others',
                }),
                expect.objectContaining({
                    title: 'Food',
                }),
            ]),
        );

        expect(workspaces).toHaveLength(3);
        expect(workspaces).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    /* title: 'Loan',
                    type: 'income', */
                }),
                expect.objectContaining({
                    /* title: 'Website Hosting',
                    type: 'outcome', */
                }),
                expect.objectContaining({
                    /*  title: 'Ice cream',
                    type: 'outcome', */
                }),
            ]),
        );
    });
});
