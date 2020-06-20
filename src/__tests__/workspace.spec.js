import { describe, expect, it, } from '@jest/globals';

import request from 'supertest';
import app from '../app';

describe("Workspaces", () => {
    it("should be able to create a new workspace", async () => {
        const response = await request(app.route)
        .post("/workspaces")
        .send({

            title: "Umbriel",
            description: 'Workspace jobs'
        });

        expect(response.body.id)
        .toBe(true);

        expect(response.body)
        .toMatchObject({

            title: "Umbriel",
            description: 'Workspace jobs',
            likes: 0
        });
    });

    it("should be able to list the workspaces", async () => {
        const workspace = await request(app.route)
        .post("/workspaces")
        .send({

            title: "Umbriel",
            description: 'Workspace jobs'
        });

        const response = await request(app.route)
        .get("/workspaces");

        expect(response.body)
        .toEqual(
            expect.arrayContaining([
                {
                    id: workspace.body.id,

                    title: "Umbriel",
                    description: 'Workspace jobs',
                    likes: 0
                }
            ])
        );
    });

    it("should be able to update workspace", async () => {
        const workspace = await request(app.route)
        .post("/workspaces")
        .send({

            title: "Umbriel",
            description: 'Workspace jobs'
        });

        const response = await request(app.route)
        .put(`/workspaces/${workspace.body.id}`)
        .send({
            
            title: "Unform",
            description: 'Workspace jobs'
        });

        expect(response.body.id)
        .toBe(true);

        expect(response.body)
        .toMatchObject({
            
            title: "Unform",
            description: 'Workspace jobs'
        });
    });

    it("should not be able to update a workspace that does not exist", async () => {
        await request(app.route)
        .put(`/workspaces/123`)
        .expect(400);
    });

    it("should not be able to update workspace likes manually", async () => {
        const workspace = await request(app.route)
        .post("/workspaces")
        .send({

            title: "Umbriel",
            description: 'Workspace jobs'
        });

        const response = await request(app.route)
        .put(`/workspaces/${workspace.body.id}`)
        .send({
            likes: 15
        });

        expect(response.body)
        .toMatchObject({
            likes: 0
        });
    });

    it("should be able to delete the workspace", async () => {
        const response = await request(app.route)
        .post("/workspaces")
        .send({

            title: "Umbriel",
            description: 'Workspace jobs'
        });

        await request(app.route)
        .delete(`/workspaces/${response.body.id}`)
        .expect(204);

        const workspaces = await request(app.route)
        .get("/workspaces");

        const workspace = workspaces.body.find((r) => r.id === response.body.id);

        expect(workspace)
        .toBe(undefined);
    });

    it("should not be able to delete a workspace that does not exist", async () => {
        await request(app.route)
        .delete(`/workspaces/123`)
        .expect(400);
    });
});
