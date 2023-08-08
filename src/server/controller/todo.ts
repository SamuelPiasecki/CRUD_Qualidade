import { todoRepository } from "@server/repository/todo";
import { z as schema } from "zod";
import { NextApiRequest, NextApiResponse } from "next";
import { HttpNotFoundError } from "@server/infra/errors";

async function get(req: Request) {
  const { searchParams } = new URL(req.url);
  const query = {
    page: searchParams.get("page"),
    limit: searchParams.get("limit"),
  };
  const page = Number(query.page);
  const limit = Number(query.limit);

  //if (query.page && typeof query.page !== "number") {
  if (query.page && isNaN(page)) {
    return new Response(
      JSON.stringify({
        error: {
          message: "`page` must be a number",
        },
      }),
      { status: 400 }
    );
  }
  //if (query.limit && typeof query.limit !== "number") {
  if (query.limit && isNaN(limit)) {
    return new Response(
      JSON.stringify({
        error: {
          message: "`limit` must be a number",
        },
      }),
      { status: 400 }
    );
  }

  try {
    const output = await todoRepository.get({
      page,
      limit,
    });

    return new Response(
      JSON.stringify({
        total: output.total,
        pages: output.pages,
        todos: output.todos,
      }),
      { status: 200 }
    );
  } catch {
    return new Response(
      JSON.stringify({ error: { message: "Failed to fetch TODOs" } }),
      {
        status: 400,
      }
    );
  }
}

const TodoCreateBodySchema = schema.object({
  content: schema.string(),
});

async function create(req: Request) {
  // Fail Fast Validations
  const body = TodoCreateBodySchema.safeParse(await req.json());

  // Retornar um erro, caso não tenha 'body'
  // Type Narrowing
  if (!body.success) {
    return new Response(
      JSON.stringify({
        error: {
          message: "You need to provide a content to create a TODO",
          description: body.error,
        },
      }),
      { status: 400 }
    );
  }

  // Here we have the data!
  try {
    const createdTodo = await todoRepository.createByContent(body.data.content);
    return new Response(
      JSON.stringify({
        todo: createdTodo,
      }),
      { status: 201 }
    );
  } catch {
    return new Response(
      JSON.stringify({
        error: {
          message: "Failed to create TODO",
        },
      }),
      { status: 400 }
    );
  }
}

async function toggleDone(req: NextApiRequest, res: NextApiResponse) {
  const todoId = req.query.id;

  if (!todoId || typeof todoId !== "string") {
    res.status(400).json({
      error: {
        message: "You must to provide a string ID",
      },
    });
    return;
  }

  try {
    const updatedTodo = await todoRepository.toggleDone(todoId);
    res.status(200).json({
      todo: updatedTodo,
    });
  } catch (err) {
    if (err instanceof Error) {
      res.status(404).json({
        error: {
          message: err.message,
        },
      });
    }
  }
}

async function deleteById(req: NextApiRequest, res: NextApiResponse) {
  const querySchema = schema.object({
    id: schema.string().uuid().nonempty(),
  });

  const parsedQuery = querySchema.safeParse(req.query);
  if (!parsedQuery.success) {
    res.status(400).json({
      error: {
        message: `You must to provide a valid id`,
      },
    });
    return;
  }

  try {
    const todoId = parsedQuery.data.id;
    await todoRepository.deleteById(todoId);
    res.status(204).end();
  } catch (err) {
    if (err instanceof HttpNotFoundError) {
      return res.status(err.status).json({
        error: {
          message: err.message,
        },
      });
    }
    return res.status(500).json({
      error: {
        message: `Internal server error`,
      },
    });
  }
}

export const todoController = {
  get,
  create,
  toggleDone,
  deleteById,
};
