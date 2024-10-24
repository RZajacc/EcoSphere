function page({ params }: { params: { title: string } }) {
  return <div>{decodeURI(params.title)}</div>;
}

export default page;
