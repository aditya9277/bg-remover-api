const request = require('supertest');
const app = require('../src/server');

describe('Image Processing API', () => {
  it('should validate image URL format', async () => {
    const response = await request(app)
      .post('/api/remove-background')
      .send({
        image_url: 'invalid-url',
        bounding_box: {
          x_min: 0,
          y_min: 0,
          x_max: 100,
          y_max: 100
        }
      });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error');
  });

  it('should validate bounding box coordinates', async () => {
    const response = await request(app)
      .post('/api/remove-background')
      .send({
        image_url: 'https://example.com/image.jpg',
        bounding_box: {
          x_min: 100,
          y_min: 0,
          x_max: 50,
          y_max: 100
        }
      });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error');
  });
});