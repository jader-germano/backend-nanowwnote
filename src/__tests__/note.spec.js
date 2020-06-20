import { describe, it, expect} from '@jest/globals';

import request from 'supertest';
import app from '../app';

describe("Notes", () => {
  it("should be able to create a new note", async () => {
    const response = await request(app.route)
      .post("/notes")
      .send({
        title: "Umbriel",
        techs: ["Node", "Express", "TypeScript"]
      });

    expect(response.body.id).toBe(true);

    expect(response.body).toMatchObject({
      title: "Umbriel",
      likes: 0
    });
  });

  it("should be able to list the notes", async () => {
    const note = await request(app.route)
      .post("/notes")
      .send({
        title: "Umbriel",
      });

    const response = await request(app.route).get("/notes");

    expect(response.body).toEqual(
      expect.arrayContaining([
        {
          id: note.body.id,
          title: "Umbriel",
          description: 'Workspace jobs',
        }
      ])
    );
  });

  it("should be able to update note", async () => {
    const note = await request(app.route)
      .post("/notes")
      .send({
        title: "Umbriel",
        description: 'Workspace jobs'
      });

    const response = await request(app.route)
      .put(`/notes/${note.body.id}`)
      .send({
        title: "Unform",
        description: 'Workspace jobs'
      });

    expect(response.body.id).toBe(true);

    expect(response.body).toMatchObject({
      title: "Unform",
      description: 'Workspace jobs'
    });
  });

  it("should not be able to update a note that does not exist", async () => {
    await request(app.route).put(`/notes/123`).expect(400);
  });

  it("should not be able to update note likes manually", async () => {
    const note = await request(app.route)
      .post("/notes")
      .send({
        title: "Umbriel",
        description: 'Workspace jobs'
      });

    const response = await request(app.route)
      .put(`/notes/${note.body.id}`)
      .send({
        likes: 15
      });

    expect(response.body).toMatchObject({
      likes: 0
    });
  });

  it("should be able to delete the note", async () => {
    const response = await request(app.route)
      .post("/notes")
      .send({
        title: "Umbriel",
        techs: ["Node", "Express", "TypeScript"]
      });

    await request(app.route).delete(`/notes/${response.body.id}`).expect(204);

    const notes = await request(app.route).get("/notes");

    const note = notes.body.find((r) => r.id === response.body.id);

    expect(note).toBe(undefined);
  });

  it("should not be able to delete a note that does not exist", async () => {
    await request(app.route).delete(`/notes/123`).expect(400);
  });
});
