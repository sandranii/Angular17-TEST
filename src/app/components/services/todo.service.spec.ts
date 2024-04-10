import { TestBed } from '@angular/core/testing';

import { TodoService } from './todo.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('TodoService', () => {
  let service: TodoService;

  const todos = [
    'go to work',
    'workout',
    'shop groceries'
  ];

  const okResponse = new Response(JSON.stringify(todos), {
    status: 200,
    statusText: 'OK'
  });

  const errorResponse = new Response('Not Found', {
    status: 404,
    statusText: 'Not Found'
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(TodoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('gets the to-dos', async () => {
    // Arrange
    const fetchSpy = jasmine.createSpy('fetch')
      .and.returnValue(okResponse);
    const todoService = new TodoService(fetchSpy);

    // Act
    const actualTodos = await todoService.getTodos();

    // Assert
    expect(actualTodos).toEqual(todos);
    expect(fetchSpy).toHaveBeenCalledWith('/todos');

  })

  it('handles an Http error when getting the to-dos', async () => {
    // Arrange
    const fetchSpy = jasmine.createSpy('fetch')
      .and.returnValue(errorResponse);
    const todoService = new TodoService(fetchSpy);

    // Act
    let error;
    try {
      await todoService.getTodos();
    } catch(e) {
      error = e;
    }

    // Assert
    expect(error).toEqual(new Error('HTTP error: 404 Not Found'));
    expect(fetchSpy).toHaveBeenCalledWith('/todos');

  })
});
